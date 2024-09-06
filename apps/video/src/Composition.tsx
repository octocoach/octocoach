import { ColorName, flavors } from "@catppuccin/palette";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

import { Numeronym } from "./Numeronym";
import { SideBySide } from "./SideBySide";

const c = (colorName: ColorName) => flavors.mocha.colors[colorName].hex;

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
        <div
          style={{
            fontSize: 80,
          }}
        >
          <Numeronym text={text} progress={progress} />
        </div>
      </SideBySide>
    </AbsoluteFill>
  );
};
