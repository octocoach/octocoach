import { AccentName } from "@catppuccin/palette";
import { scale } from "@remotion/animation-utils";
import { fitText } from "@remotion/layout-utils";
import { useEffect, useState } from "react";
import {
  continueRender,
  delayRender,
  interpolate,
  Loop,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { AIBadge } from "./AIBadge";
import { c } from "./helpers";

const colors: AccentName[] = ["mauve", "sapphire", "sky", "teal"];

const TitleInner = ({
  width,
  maxHeight,
  active,
  lines,
}: {
  width: number;
  maxHeight: number;
  active: boolean;
  lines: string[];
}) => {
  const fontWeight = 900;

  const frame = useCurrentFrame();
  const loop = Loop.useLoop();

  if (!loop) throw new Error("This component must be used within a loop");

  const wordDuration = loop.durationInFrames / lines.length;

  return (
    <div
      style={{
        width,
        overflow: "visible",
        maxHeight: `${maxHeight}%`,
        position: "relative",
      }}
    >
      <AIBadge width={100} height={100} />
      {active &&
        lines.map((line, i) => {
          const { fontSize } = fitText({
            text: line,
            fontFamily: "Recursive",
            fontWeight,
            withinWidth: width,
          });

          const lineHeight = interpolate(fontSize, [50, 100], [2.5, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const start = i * wordDuration;

          const active = frame >= start && frame < start + wordDuration;

          const casl = active
            ? Math.sin((Math.PI * (frame - start)) / wordDuration)
            : 0;

          const transform = scale(
            active ? interpolate(casl, [0, 1], [1, 1.2]) : 1,
          );

          return (
            <div
              key={i}
              style={{
                color: c(colors[i % colors.length]),
                fontSize,
                fontWeight,
                lineHeight,
                fontVariationSettings: `"CASL" ${casl}`,
                transform,
              }}
            >
              {line}
            </div>
          );
        })}
    </div>
  );
};

export const Title = ({ text }: { text: string }) => {
  const lines = text.trim().split(" ");
  const width = 400;
  const loopDuration = 10;

  const { fps } = useVideoConfig();

  const [active, setActive] = useState(false);

  useEffect(() => {
    const handle = delayRender();
    setTimeout(() => {
      setActive(true);
      continueRender(handle);
    }, 1000);
  }, []);

  const frame = useCurrentFrame();

  const maxHeight = interpolate(frame, [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Loop durationInFrames={loopDuration * fps} layout="none">
      <TitleInner
        width={width}
        maxHeight={maxHeight}
        active={active}
        lines={lines}
      />
    </Loop>
  );
};
