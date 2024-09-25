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
  items: z.array(sceneSchema),
});

const getComponent = ({ type, props }: z.infer<typeof sceneSchema>) => {
  switch (type) {
    case "words":
      console.log(type);
      return <Words {...props} />;
    case "animatedEmoji":
      console.log(type);
      return <AnimatedEmoji {...props} />;
    case "gif":
      console.log(type);
      return <GifReaction {...props} />;
    default:
      console.log(type);
      return exhaustiveCheck(type);
  }
};

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

  for (const scene of props.items) {
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

export const Sequence = ({ items }: z.infer<typeof sequenceSchema>) => {
  const { fps } = useVideoConfig();

  if (items.length === 0) return null;

  return (
    <Layout locale="en">
      <TransitionSeries
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.map((scene, idx) => (
          <TransitionSeries.Sequence
            key={idx}
            durationInFrames={calculateSceneDuration(scene, fps)}
            layout="none"
          >
            {getComponent(scene)}
          </TransitionSeries.Sequence>
        ))}
      </TransitionSeries>
    </Layout>
  );
};
