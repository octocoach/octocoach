import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

import { AnimatedEmoji } from "./AnimatedEmoji";
import { AnimatedList, animatedListSchema } from "./AnimatedList";
import { BaLogo } from "./BALogo";
import { CourseTile } from "./CourseTile";
import { ImagePanLayout, imagePanLayoutSchema } from "./ImagePanLayout";
import { Layout } from "./Layout";
import { LineByLineReveal, lineByLineRevealSchema } from "./LineByLineReveal";

export const advertSchema = z.object({
  locale: z.enum(["en", "de"]),
  content: z.object({
    1: animatedListSchema,
    2: lineByLineRevealSchema,
    3: lineByLineRevealSchema,
    4: animatedListSchema,
    5: z.object({
      imagePan: imagePanLayoutSchema,
      lineByLineReveal: lineByLineRevealSchema,
    }),
  }),
});

export const advertDefaultProps: z.infer<typeof advertSchema> = {
  locale: "en",
  content: {
    1: {
      layout: "portrait",
      durationInFrames: 4 * 30,
      content: {
        animatedEmoji: { emoji: "muscle", width: 300 },
        title: "You already know",
        items: [
          { text: "HTML", logo: "html" },
          { text: "CSS", logo: "css" },
          { text: "JavaScript", logo: "javascript" },
          { text: "React", logo: "react" },
        ],
      },
    },
    2: {
      text: "Don't just use AI",
      durationInFrames: 3 * 30,
      animatedEmoji: { emoji: "goose", width: 300 },
      wordsPerLine: 1,
      width: 1080 * 0.3,
    },
    3: {
      text: "Build with it!",
      durationInFrames: 2 * 30,
      animatedEmoji: { emoji: "peacock", width: 300 },
      wordsPerLine: 1,
      width: 1080 * 0.3,
    },
    4: {
      durationInFrames: 3 * 30,
      layout: "portrait",
      content: {
        animatedEmoji: { emoji: "mechanicalArm", width: 300 },
        title: "Become a NextGen Full-Stack Developer",
        items: [
          { text: "TypeScript", logo: "typescript" },
          { text: "Next.js", logo: "nextjs" },
          { text: "Astro", logo: "astro" },
          { text: "OpenAI", logo: "openai" },
          { text: "Anthropic", logo: "anthropic" },
        ],
      },
    },
    5: {
      imagePan: {
        image: "4.jpg",
        layout: "portrait",
        imagePercentage: 30,
        panDuration: 120,
      },
      lineByLineReveal: {
        text: "Join our 4 month AI Web-App Development Course",
        wordsPerLine: 2,
        durationInFrames: 120,
        width: 1080 * 0.8,
      },
    },
  },
};

export const Advert = ({ locale, content }: z.infer<typeof advertSchema>) => {
  const { fps, width } = useVideoConfig();

  const timingFunction = springTiming({ config: { damping: 200 } });

  const transitionDuration = timingFunction.getDurationInFrames({ fps });

  return (
    <Layout locale={locale}>
      <Audio src={staticFile("audio/song3.mp3")} volume={0.3} />
      <TransitionSeries layout="none">
        <TransitionSeries.Sequence
          durationInFrames={content[1].durationInFrames + transitionDuration}
        >
          <AnimatedList
            {...content[1]}
            durationInFrames={content[1].durationInFrames + transitionDuration}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-top" })}
        />
        <TransitionSeries.Sequence
          durationInFrames={3 * fps + transitionDuration}
        >
          <LineByLineReveal
            {...content[2]}
            durationInFrames={3 * fps + transitionDuration}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-left" })}
        />
        <TransitionSeries.Sequence
          durationInFrames={2 * fps + transitionDuration}
        >
          <LineByLineReveal
            {...content[3]}
            durationInFrames={2 * fps + transitionDuration}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-bottom" })}
        />
        <TransitionSeries.Sequence
          durationInFrames={content[4].durationInFrames + transitionDuration}
        >
          <AnimatedList
            {...content[4]}
            durationInFrames={content[4].durationInFrames + transitionDuration}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-right" })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <ImagePanLayout {...content[5].imagePan} panDuration={120}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <LineByLineReveal
                {...content[5].lineByLineReveal}
                durationInFrames={120}
              />
            </div>
          </ImagePanLayout>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-top" })}
        />
        <TransitionSeries.Sequence durationInFrames={60}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <BaLogo width={width * 0.6} />
            </div>
            <AnimatedEmoji
              emoji="moneyFace"
              width={width * 0.5}
              playbackRate={3}
            />
          </div>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={timingFunction}
          presentation={slide({ direction: "from-left" })}
        />
        <TransitionSeries.Sequence durationInFrames={1000}>
          <CourseTile
            layout={"portrait"}
            title={"AI Web App Development"}
            animatedLogo={false}
            courseData={{
              locale: "en",
              data: {
                type: "Course",
                mode: "Full-time",
                fullyRemote: true,
                dates: {
                  start: "2024-11-04",
                  end: "2025-02-26",
                },
              },
            }}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Layout>
  );
};
