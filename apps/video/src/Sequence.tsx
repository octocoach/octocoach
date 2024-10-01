import { TransitionSeries } from "@remotion/transitions";
import { CalculateMetadataFunction } from "remotion";
import { z } from "zod";

import { AnimatedEmoji, animatedEmojiSchema } from "./components/AnimatedEmoji";
import { GifReaction, gifSchema } from "./components/GifReaction";
import { Logo, logoSchema } from "./components/Logo";
import { Words, wordsSchema } from "./components/Words";
import { exhaustiveCheck } from "./helpers";
import { useIsLandscape } from "./hooks";
import { Layout } from "./Layout";

export const sceneSchema = z.discriminatedUnion("type", [
  wordsSchema,
  animatedEmojiSchema,
  gifSchema,
  logoSchema,
]);

export const sceneLayoutSchema = z.object({
  durationInFrames: z.number(),
  scenes: z.array(sceneSchema),
});

export const sequenceSchema = z.object({
  scenes: z.array(sceneLayoutSchema),
});

export const calculateSequenceMetadata: CalculateMetadataFunction<
  z.infer<typeof sequenceSchema>
> = ({ props }) => {
  const durationInFrames =
    props.scenes.reduce(
      (acc, { durationInFrames }) => acc + durationInFrames,
      0,
    ) || 30;

  return { props, durationInFrames };
};

export const Scene = ({
  scene: { type, props },
  durationInFrames,
}: {
  scene: z.infer<typeof sceneSchema>;
  durationInFrames: number;
}) => {
  switch (type) {
    case "words":
      return <Words {...props} durationInFrames={durationInFrames} />;
    case "animatedEmoji":
      return <AnimatedEmoji {...props} />;
    case "gif":
      return <GifReaction {...props} />;
    case "logo":
      return <Logo {...props} durationInFrames={durationInFrames} />;
    default:
      return exhaustiveCheck(type);
  }
};

export const SceneLayout = ({
  scenes,
  durationInFrames,
}: z.infer<typeof sceneLayoutSchema>) => {
  const isLandscape = useIsLandscape();

  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "1fr",
        gridAutoColumns: "1fr",
        gridAutoFlow: isLandscape ? "column" : "row",
        placeItems: "center",
        gap: 20,
        width: "100%",
        height: "100%",
      }}
    >
      {scenes.map((scene, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            display: "flex",
            placeContent: "center",
            placeItems: "center",
          }}
        >
          <Scene
            key={i}
            scene={scene}
            durationInFrames={durationInFrames || 30}
          />
        </div>
      ))}
    </div>
  );
};

export const Sequence = ({ scenes }: z.infer<typeof sequenceSchema>) => {
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
            durationInFrames={scene.durationInFrames || 30}
            layout="none"
          >
            <SceneLayout {...scene} />
          </TransitionSeries.Sequence>
        ))}
      </TransitionSeries>
    </Layout>
  );
};
