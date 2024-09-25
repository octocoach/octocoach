import { fitText } from "@remotion/layout-utils";
import { useState } from "react";
import { interpolate, random, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";

import {
  AnimatedEmoji,
  animatedEmojiPropsSchema,
} from "./components/AnimatedEmoji";
import { accentColors } from "./helpers";
import { useIsPortrait } from "./hooks";

const lineSchema = z.object({
  progress: z.number(),
  lineIndex: z.number(),
  text: z.string(),
  active: z.boolean(),
  width: z.number(),
});

const Word = ({
  children,
  lineIndex,
  wordIndex,
}: {
  children: string;
  lineIndex: number;
  wordIndex: number;
}) => {
  const [colorIndex] = useState(
    Math.floor(
      random(`line-${lineIndex}-word-${wordIndex}`) * accentColors.length,
    ),
  );

  return <span style={{ color: accentColors[colorIndex] }}>{children} </span>;
};

const Line = ({
  text,
  active,
  width,
  lineIndex,
  progress,
}: z.infer<typeof lineSchema>) => {
  const fontWeight = active
    ? interpolate(progress, [0, 0.5, 1], [300, 900, 300])
    : 300;

  const { fontSize } = fitText({
    text,
    fontFamily: "Recursive",
    fontWeight,
    withinWidth: width,
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        lineHeight: 1,
        textWrap: "nowrap",
      }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <Word key={wordIndex} lineIndex={lineIndex} wordIndex={wordIndex}>
          {word}
        </Word>
      ))}
    </div>
  );
};

export const lineByLineRevealSchema = z.object({
  text: z.string(),
  wordsPerLine: z.number(),
  durationInFrames: z.number(),
  animatedEmoji: animatedEmojiPropsSchema.optional(),
  width: z.number(),
});

export const LineByLineReveal = ({
  text,
  wordsPerLine,
  durationInFrames,
  animatedEmoji,
  width,
}: z.infer<typeof lineByLineRevealSchema>) => {
  const frame = useCurrentFrame();
  const isPortrait = useIsPortrait();

  const progress = frame / durationInFrames;
  const lines = text.split(" ").reduce((acc, curr, i) => {
    const chunkIndex = Math.floor(i / wordsPerLine);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(curr);
    return acc;
  }, [] as string[][]);
  const currentLine = Math.floor(progress * lines.length);

  const lineProgress = (progress * lines.length) % 1;

  return (
    <Sequence
      durationInFrames={durationInFrames}
      style={{
        flexDirection: isPortrait ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 20,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {lines.map((t, i) => (
          <Line
            progress={lineProgress}
            key={i}
            lineIndex={i}
            text={t.join(" ")}
            width={width}
            active={currentLine == i}
          />
        ))}
      </div>
      {animatedEmoji && <AnimatedEmoji {...animatedEmoji} />}
    </Sequence>
  );
};
