import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

import { Footer } from "./Footer";
import { ImagePanLayout } from "./ImagePanLayout";
import { Json } from "./Json";
import { Layout } from "./Layout";
import { Logo } from "./Logo";
import { Numeronym } from "./Numeronym";
import { Title } from "./Title";

const CourseData = z.discriminatedUnion("locale", [
  z.object({
    locale: z.literal("en"),
    data: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("Course"),
        mode: z.enum(["Full-time", "Part-time"]),
        fullyRemote: z.boolean(),
        dates: z.object({
          start: z.string(),
          end: z.string(),
        }),
      }),
      z.object({
        type: z.literal("Workshop"),
        mode: z.enum(["Online", "In-person"]),
        start: z.string(),
        duration: z.string(),
      }),
    ]),
  }),
  z.object({
    locale: z.literal("de"),
    data: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("Kurs"),
        modus: z.enum(["Vollzeit", "Teilzeit"]),
        remote: z.boolean(),
        termine: z.object({
          beginn: z.string(),
          ende: z.string(),
        }),
      }),
      z.object({
        type: z.literal("Workshop"),
        modus: z.enum(["Online", "Persönlich"]),
        beginn: z.string(),
        dauer: z.string(),
      }),
    ]),
  }),
]);

export type CourseData = z.infer<typeof CourseData>;

export const courseTileCompSchema = z.object({
  layout: z.enum(["square", "portrait"]),
  title: z.string().min(3),
  animatedLogo: z.boolean(),
  courseData: CourseData,
});

const companyName = "Quietscheentchen";

export const CourseTile = ({
  layout,
  title,
  animatedLogo,
  courseData,
}: z.infer<typeof courseTileCompSchema>) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = animatedLogo
    ? interpolate(frame, [5, 30], [0, 1], {
        easing: Easing.inOut(Easing.ease.bind(Easing)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <Layout locale={courseData.locale}>
      <ImagePanLayout
        layout={layout}
        image="3.jpg"
        panDuration={durationInFrames}
        imagePercentage={layout === "square" ? 40 : 20}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Logo durationInFrames={30} size={100} />
          <Numeronym text={companyName} progress={progress} />
        </div>

        <Title text={title} />

        <Json data={courseData.data} />

        <Footer />
      </ImagePanLayout>
    </Layout>
  );
};
