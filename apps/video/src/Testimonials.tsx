import { sectionContentWithSubSectionsSchema } from "@octocoach/db/schemas/org/content";
import {
  CalculateMetadataFunction,
  Img,
  interpolate,
  Series,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";

import { Layout } from "./Layout";
import { fps } from "./Root";

export const testimonialsSchema = sectionContentWithSubSectionsSchema;

const testimonialsResponseSchema = z.object({
  id: z.literal("testimonials"),
  locale: z.enum(["en", "de"]),
  value: testimonialsSchema,
});

const wpm = 300;

const calculateReadingTime = (text: string) => {
  const numberOfWords = text.trim().split(" ").length;

  const readingTime = (numberOfWords / wpm) * 60;

  return readingTime * fps;
};

export const calculateTestimonialsMetadata: CalculateMetadataFunction<
  Props
> = async () => {
  const res = await fetch("https://q15.co/api/content/en/testimonials");

  if (!res.ok) throw new Error("Testimonials not found");

  const { value } = testimonialsResponseSchema.parse(await res.json());

  let durationInFrames = calculateReadingTime(value.title);

  for (const { text } of value.subSections) {
    durationInFrames += calculateReadingTime(text);
  }

  return { props: value, durationInFrames };
};

type Props = z.infer<typeof testimonialsSchema>;

const Testimonial = ({
  testimonial: { text, title, image },
  durationInFrames,
}: {
  testimonial: Props["subSections"][number];
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1]);

  const words = text.split(" ").length;

  const wordsToShow = Math.round(progress * words);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        placeItems: "center",
        margin: 50,
        gap: 20,
      }}
    >
      <Img
        src={image.src}
        style={{
          width: "100%",
          imageRendering: "pixelated",
          borderRadius: 20,
        }}
      />
      <div style={{ fontSize: 20 }}>
        <p style={{ fontVariationSettings: "'CASL' 1" }}>
          "
          {text.split(" ").map((word, i) => (
            <span style={{ opacity: i <= wordsToShow ? 1 : 0.2 }}>{word} </span>
          ))}
          "
        </p>
        <p style={{ textAlign: "right", fontWeight: 700 }}>- {title}</p>
      </div>
    </div>
  );
};

export const Testimonials = ({ title, subSections }: Props) => {
  return (
    <Layout locale="en">
      <Series>
        <Series.Sequence
          durationInFrames={calculateReadingTime(title)}
          layout="none"
        >
          <h1 style={{ fontSize: 60 }}>{title}</h1>
        </Series.Sequence>
        {subSections.map((subSection, key) => {
          const durationInFrames = calculateReadingTime(subSection.text);
          return (
            <Series.Sequence durationInFrames={durationInFrames} layout="none">
              <Testimonial
                key={key}
                testimonial={subSection}
                durationInFrames={durationInFrames}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </Layout>
  );
};
