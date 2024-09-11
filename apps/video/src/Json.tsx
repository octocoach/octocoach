import mocha from "@catppuccin/vscode/themes/mocha.json";
import { highlight, LighterResult, Theme } from "@code-hike/lighter";
import { useEffect, useState } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { CourseData } from "./Composition";

const start = 90;
const duration = 120;

export const Json = ({ data }: { data: CourseData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [start - fps, start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const [highlighted, setHighlighted] = useState<LighterResult>();

  const linesVisible = Math.ceil(
    interpolate(
      frame,
      [start, start + duration],
      [0, highlighted?.lines.length || 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );

  useEffect(() => {
    const { locale: _, ...dataWithoutLocale } = data;
    const dataStr = JSON.stringify(dataWithoutLocale, null, 2);
    void highlight(dataStr, "json", mocha as Theme).then((highlighted) =>
      setHighlighted(highlighted),
    );
  }, [data]);

  return (
    highlighted && (
      <div
        style={{
          ...highlighted.style,
          fontSize: 40,
          whiteSpace: "pre-wrap",
          padding: 20,
          borderRadius: 10,
          opacity,
        }}
      >
        {highlighted.lines.map((line, i) => {
          const activeLine = i + 1 <= linesVisible;

          return (
            <div key={i} style={{ opacity: activeLine ? 1 : 0.2 }}>
              {line.map((token, j) => (
                <span style={token.style} key={j}>
                  {token.content}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    )
  );
};
