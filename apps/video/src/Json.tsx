import mocha from "@catppuccin/vscode/themes/mocha.json";
import { highlight, LighterResult, Theme } from "@code-hike/lighter";
import React, { useEffect, useState } from "react";

export const Json = ({ data }: { data: object }) => {
  const [highlighted, setHighlighted] = useState<LighterResult>();

  useEffect(() => {
    const dataStr = JSON.stringify(data, null, 2);
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
        }}
      >
        {highlighted.lines.map((line) => (
          <div>
            {line.map((token) => (
              <span style={token.style}>{token.content}</span>
            ))}
          </div>
        ))}
      </div>
    )
  );
};
