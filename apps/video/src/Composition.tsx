import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

import { c } from "./helpers";
import { Json } from "./Json";
import { Logo } from "./Logo";
import { Numeronym } from "./Numeronym";
import { SideBySide } from "./SideBySide";

export const compSchema = z.object({
  text: z.string(),
});

export const MyComposition = ({ text }: z.infer<typeof compSchema>) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [30, 90], [0, 1], {
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
      <SideBySide>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Logo durationInFrames={120} size={200} />
          <Numeronym text={text} progress={progress} />
        </div>
        <Json
          data={{
            type: "Course",
            mode: "Full-time",
            start: "2024-11-04",
            end: "2025-02-26",
          }}
        />
      </SideBySide>
    </AbsoluteFill>
  );
};
