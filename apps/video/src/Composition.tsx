import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

import { Footer } from "./Footer";
import { c } from "./helpers";
import { Json } from "./Json";
import { Logo } from "./Logo";
import { Numeronym } from "./Numeronym";
import { SideBySide } from "./SideBySide";
import { Title } from "./Title";

export const compSchema = z.object({
  text: z.string(),
});

export const MyComposition = ({ text }: z.infer<typeof compSchema>) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [5, 30], [0, 1], {
    easing: Easing.inOut(Easing.ease.bind(Easing)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: `var(--font-recursive)`,
        backgroundColor: c("crust"),
        color: c("text"),
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <SideBySide image="3.jpg" panDuration={durationInFrames}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo durationInFrames={30} size={200} />
          <Numeronym text={text} progress={progress} />
        </div>

        <Title text={"AI Web App Development"} />

        <Json
          data={{
            type: "Course",
            mode: "Full-time",
            start: "2024-11-04",
            end: "2025-02-26",
          }}
        />

        <Footer />
      </SideBySide>
    </AbsoluteFill>
  );
};
