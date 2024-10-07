import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

import { AnimatedList, animatedListSchema } from "./AnimatedList";
import { BaLogo } from "./BALogo";
import { AnimatedEmoji } from "./components/AnimatedEmoji";
import { CourseData, CourseTile } from "./CourseTile";
import { useIsLandscape, useIsPortrait } from "./hooks";
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

const courseData: Record<"en" | "de", CourseData> = {
  en: {
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
  },
  de: {
    locale: "de",
    data: {
      type: "Kurs",
      modus: "Vollzeit",
      remote: true,
      termine: {
        beginn: "2024-11-04",
        ende: "2025-02-26",
      },
    },
  },
};

export const Advert = ({ locale, content }: z.infer<typeof advertSchema>) => {
  const { fps, width } = useVideoConfig();

  const timingFunction = springTiming({ config: { damping: 200 } });

  const transitionDuration = timingFunction.getDurationInFrames({ fps });
  const isPortrait = useIsPortrait();
  const isLandscape = useIsLandscape();

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
          <ImagePanLayout
            {...content[5].imagePan}
            panDuration={120}
            layout={isLandscape ? "square" : "portrait"}
          >
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
        <TransitionSeries.Sequence durationInFrames={90}>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: isLandscape ? "row" : "column",
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
              <BaLogo width={isLandscape ? width * 0.3 : width * 0.6} />
            </div>
            <AnimatedEmoji
              emoji="moneyFace"
              durationInSeconds={2}
              width={isLandscape ? width * 0.3 : width * 0.6}
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
            layout={isPortrait ? "portrait" : "square"}
            title={"AI Web App Development"}
            animatedLogo={false}
            courseData={{
              ...courseData[locale],
            }}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Layout>
  );
};
