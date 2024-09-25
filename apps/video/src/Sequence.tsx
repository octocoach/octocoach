import { TransitionSeries } from "@remotion/transitions";
import { CalculateMetadataFunction, useVideoConfig } from "remotion";
import { z } from "zod";

import {
  AnimatedEmoji,
  animatedEmojiSchema,
  calculateAnimatedEmojiDuration,
} from "./components/AnimatedEmoji";
import { GifReaction, gifSchema } from "./components/GifReaction";
import { calculateWordsDuration, Words, wordsSchema } from "./components/Words";
import { exhaustiveCheck } from "./helpers";
import { Layout } from "./Layout";
import { fps } from "./Root";

export const sceneSchema = z.discriminatedUnion("type", [
  wordsSchema,
  animatedEmojiSchema,
  gifSchema,
]);

export const sequenceSchema = z.object({
  scenes: z.array(sceneSchema),
});

const calculateSceneDuration = (
  { type, props: value }: z.infer<typeof sceneSchema>,
  fps: number,
) => {
  switch (type) {
    case "words":
      return calculateWordsDuration(value, fps);
    case "animatedEmoji":
      return calculateAnimatedEmojiDuration(value, fps);
    case "gif":
      return 120;
    default:
      return exhaustiveCheck(type);
  }
};

export const calculateSequenceMetadata: CalculateMetadataFunction<
  z.infer<typeof sequenceSchema>
> = ({ props }) => {
  let durationInFrames = 0;

  for (const scene of props.scenes) {
    durationInFrames += calculateSceneDuration(scene, fps);
  }

  if (
    durationInFrames === 0 ||
    isNaN(durationInFrames) ||
    durationInFrames === Infinity
  )
    durationInFrames = 1;

  return { props, durationInFrames };
};

export const Scene = ({ type, props }: z.infer<typeof sceneSchema>) => {
  switch (type) {
    case "words":
      return <Words {...props} />;
    case "animatedEmoji":
      return <AnimatedEmoji {...props} />;
    case "gif":
      return <GifReaction {...props} />;
    default:
      return exhaustiveCheck(type);
  }
};

export const Sequence = ({ scenes }: z.infer<typeof sequenceSchema>) => {
  const { fps } = useVideoConfig();

  if (scenes.length === 0) return null;

  return (
    <Layout locale="en">
      <TransitionSeries
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {scenes.map((scene, idx) => (
          <TransitionSeries.Sequence
            key={idx}
            durationInFrames={calculateSceneDuration(scene, fps)}
            layout="none"
          >
            <Scene {...scene} />
          </TransitionSeries.Sequence>
        ))}
      </TransitionSeries>
    </Layout>
  );
};
