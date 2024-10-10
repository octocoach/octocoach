import { TransitionSeries } from "@remotion/transitions";
import { createContext } from "react";
import { CalculateMetadataFunction } from "remotion";
import { z } from "zod";

import { exhaustiveCheck } from "./helpers";
import { useIsLandscape } from "./hooks";
import { Layout } from "./Layout";
import { AnimatedEmoji, animatedEmojiSchema } from "./panels/AnimatedEmoji";
import { BaLogo, baLogoSchema } from "./panels/BALogo";
import { GifReaction, gifSchema } from "./panels/GifReaction";
import {
  LineByLineReveal,
  lineByLineRevealSchema,
} from "./panels/LineByLineReveal";
import { Logo, logoSchema } from "./panels/Logo";
import { SimpleIcon, simpleIconSchema } from "./panels/SimpleIcon";
import { Words, wordsSchema } from "./panels/Words";

export const panelSchema = z.discriminatedUnion("type", [
  animatedEmojiSchema,
  baLogoSchema,
  gifSchema,
  logoSchema,
  wordsSchema,
  lineByLineRevealSchema,
  simpleIconSchema,
]);

const panelsSchema = z.array(panelSchema);

export const sceneLayoutSchema = z.object({
  durationInFrames: z.number(),
  panels: panelsSchema,
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

export const Panel = ({
  panel: { type, props },
  durationInFrames,
}: {
  panel: z.infer<typeof panelSchema>;
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
    case "baLogo":
      return <BaLogo {...props} />;
    case "lineByLineReveal":
      return (
        <LineByLineReveal {...props} durationInFrames={durationInFrames} />
      );
    case "simpleIcon":
      return <SimpleIcon {...props} />;
    default:
      return exhaustiveCheck(type);
  }
};

export const PanelsContext = createContext<z.infer<typeof panelsSchema>>([]);

export const SceneLayout = ({
  panels,
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
      <PanelsContext.Provider value={panels}>
        {panels.map((panel, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Panel panel={panel} durationInFrames={durationInFrames || 30} />
          </div>
        ))}
      </PanelsContext.Provider>
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
