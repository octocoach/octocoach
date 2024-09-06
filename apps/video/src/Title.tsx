import { AccentName } from "@catppuccin/palette";
import { fitText } from "@remotion/layout-utils";
import React, { useEffect, useState } from "react";
import { continueRender, delayRender, interpolate } from "remotion";

import { c } from "./helpers";

const colors: AccentName[] = ["mauve", "sapphire", "sky", "teal"];

export const Title = ({ text }: { text: string }) => {
  const lines = text.trim().split(" ");
  const width = 400;
  const fontWeight = 900;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const handle = delayRender();
    setTimeout(() => {
      setActive(true);
      continueRender(handle);
    }, 1000);
  }, []);

  return (
    <div style={{ width, overflow: "hidden" }}>
      {active &&
        lines.map((line, i) => {
          const { fontSize } = fitText({
            text: line,
            fontFamily: "Recursive",
            fontWeight,
            withinWidth: width,
          });
          console.log(fontSize);
          const lineHeight = interpolate(fontSize, [50, 100], [2.5, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              style={{
                color: c(colors[i % colors.length]),
                fontSize,
                fontWeight,
                lineHeight,
                fontVariationSettings: `"CASL" 0.5`,
              }}
            >
              {line}
            </div>
          );
        })}
    </div>
  );
};
