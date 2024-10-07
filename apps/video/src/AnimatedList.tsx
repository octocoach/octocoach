import { fitText } from "@remotion/layout-utils";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import {
  SiAnthropic,
  SiAstro,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiOpenai,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

import {
  AnimatedEmoji,
  animatedEmojiPropsSchema,
} from "./components/AnimatedEmoji";
import { c, exhaustiveCheck } from "./helpers";
import { useIsLandscape } from "./hooks";
import { Layout } from "./Layout";

const logoEnum = z.enum([
  "html",
  "css",
  "javascript",
  "react",
  "typescript",
  "nextjs",
  "openai",
  "anthropic",
  "astro",
]);

const getLogoIcon = (logo: z.infer<typeof logoEnum>, size = 200) => {
  switch (logo) {
    case "html":
      return <SiHtml5 size={size} color="#E44D26" />;
    case "css":
      return <SiCss3 size={size} color="#1572B6" />;
    case "javascript":
      return <SiJavascript size={size} color="#F7DF1E" />;
    case "react":
      return <SiReact size={size} color="#61DAFB" />;
    case "typescript":
      return <SiTypescript size={size} color="#3178C6" />;
    case "nextjs":
      return <SiNextdotjs size={size} color="#FFFFFF" />;
    case "openai":
      return <SiOpenai size={size} color="#412991" />;
    case "anthropic":
      return <SiAnthropic size={size} color="#CC785C" />;
    case "astro":
      return <SiAstro size={size} color="#BC52EE" />;
    default:
      return exhaustiveCheck(logo);
  }
};

export const animatedListContenItemSchema = z.object({
  logo: logoEnum,
  text: z.string(),
});

export const animatedListContentSchema = z.object({
  animatedEmoji: animatedEmojiPropsSchema,
  title: z.string(),
  items: z.array(animatedListContenItemSchema),
});

export const animatedListSchema = z.object({
  layout: z.enum(["square", "portrait", "landscape"]),
  durationInFrames: z.number(),
  content: animatedListContentSchema,
});

const ListItem = ({
  item,
  durationInFrames,
}: {
  item: z.infer<typeof animatedListContenItemSchema>;
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();

  const progress = frame / durationInFrames;

  const fontWeight = interpolate(progress, [0, 1], [300, 900]);
  const slant = interpolate(progress, [0, 1], [0, -15]);
  const casual = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        gap: 40,
      }}
    >
      {getLogoIcon(item.logo)}
      <p
        style={{
          fontSize: 150,
          fontWeight,
          textAlign: "center",
          fontVariationSettings: `'MONO' 1, 'slnt' ${slant}, 'CASL' ${casual}`,
        }}
      >
        {item.text}
      </p>
    </div>
  );
};

export const AnimatedList = ({
  durationInFrames,
  content: { title, items, animatedEmoji },
}: z.infer<typeof animatedListSchema>) => {
  const itemDuration = (durationInFrames / (items.length + 1)) * 2;
  const fontWeight = 300;

  const timing = () => springTiming({ durationInFrames: itemDuration / 2 });

  const { height, width } = useVideoConfig();
  const isLandscape = useIsLandscape();

  const { fontSize } = fitText({
    text: title,
    withinWidth: isLandscape ? width * 0.4 : width * 0.7,
    fontFamily: "Recursive",
    fontWeight: 300,
  });

  return (
    <Layout locale="en">
      <Sequence durationInFrames={durationInFrames}>
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateRows: "1fr 1fr",
            placeItems: "center",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              display: "grid",
              placeItems: "center",
              gap: isLandscape ? 20 : 40,
              padding: 50,
            }}
          >
            <AnimatedEmoji {...animatedEmoji} />
            <h1
              style={{
                fontSize,
                fontWeight,
                color: c("text"),
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              {title}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              placeItems: "center",
            }}
          >
            <TransitionSeries style={{ top: height / 4 }}>
              {items.map((item, i) => {
                return (
                  <>
                    <TransitionSeries.Transition
                      key={`transition-${i}`}
                      timing={timing()}
                      presentation={slide({ direction: "from-right" })}
                    />
                    <TransitionSeries.Sequence
                      key={`sequence-${i}`}
                      durationInFrames={itemDuration}
                    >
                      <ListItem item={item} durationInFrames={itemDuration} />
                    </TransitionSeries.Sequence>
                  </>
                );
              })}
            </TransitionSeries>
          </div>
        </div>
      </Sequence>
    </Layout>
  );
};
