import { flavors } from "@catppuccin/palette";
import * as React from "react";
import {
  interpolateColors,
  Loop,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { makePulse } from "./helpers";

const colors = flavors.mocha.colorEntries
  .filter(([_name, { accent }]) => accent)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([_name, { hex }]) => hex);

const colors1 = colors.slice(0, colors.length / 2);
const colors2 = colors.slice(colors.length / 2);

const colors1a = colors1.slice(0, colors1.length / 2);
const colors1b = colors1.slice(colors1.length / 2);

const colors2a = colors2.slice(colors2.length / 2);
const colors2b = colors2.slice(0, colors2.length / 2);

export const AIBadge = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  console.log({ colors1, colors2 });
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const loop = Loop.useLoop();

  if (!loop) throw new Error("Loop not found");

  const pulse = makePulse({ frame, fps, speed: loop.durationInFrames / fps });
  const color1a = interpolateColors(
    pulse,
    colors1a.map((_, i) => i / (colors1a.length - 1)),
    colors1a,
  );
  const color1b = interpolateColors(
    pulse,
    colors1b.map((_, i) => i / (colors1b.length - 1)),
    colors1b,
  );

  const color2a = interpolateColors(
    pulse,
    colors2a.map((_, i) => i / (colors2a.length - 1)),
    colors2a,
  );

  const color2b = interpolateColors(
    pulse,
    colors2b.map((_, i) => i / (colors2b.length - 1)),
    colors2b,
  );

  console.log({ color1a, color1b, color2a, color2b });

  return (
    <div
      style={{
        position: "absolute",
        top: height * -0.7,
        left: width * -0.5,
        zIndex: 1,
        width,
        height,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 106 76"
        fill="none"
        width={width}
        height={height}
        style={{ overflow: "visible" }}
      >
        <path
          fill="url(#a)"
          d="M75.867 52.905c-20.78 0-37.833-23.268-39.564-52.905C34.785 28.243 19.358 50.79 0 53.1c19.312 2.303 34.712 24.75 36.292 52.9 1.669-29.728 18.75-53.095 39.575-53.095Z"
        />
        <path
          fill="url(#b)"
          d="M75.953 18.966c-7.383 0-13.44-8.341-14.056-18.966-.54 10.125-6.02 18.208-12.897 19.036 6.861.825 12.332 8.872 12.893 18.964.593-10.657 6.661-19.034 14.06-19.034Z"
        />
        <defs>
          <linearGradient
            id="a"
            x1={52.5}
            x2={21}
            y1={38}
            y2={69.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color1a} />
            <stop offset={1} stopColor={color1b} />
          </linearGradient>
          <linearGradient
            id="b"
            x1={67.5}
            x2={54.318}
            y1={12.5}
            y2={19.303}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color2a} />
            <stop offset={1} stopColor={color2b} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
