import { fitText } from "@remotion/layout-utils";
import { useState } from "react";
import { interpolate, random, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";

import { accentColors } from "../helpers";
import { useIsPortrait } from "../hooks";
import { AnimatedEmoji, animatedEmojiPropsSchema } from "./AnimatedEmoji";

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

export const lineByLineRevealPropsSchema = z.object({
  text: z.array(z.string()).describe("The lines of text to display"),
  animatedEmoji: animatedEmojiPropsSchema.optional(),
  width: z.number().describe("The width of the text in pixels"),
});

export const lineByLineRevealSchema = z
  .object({
    type: z.literal("lineByLineReveal"),
    props: lineByLineRevealPropsSchema,
  })
  .describe(
    "The lines are displayed all together, but each line is bolded one at a time",
  );

export const LineByLineReveal = ({
  text,

  durationInFrames,
  animatedEmoji,
  width,
}: z.infer<typeof lineByLineRevealPropsSchema> & {
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  const isPortrait = useIsPortrait();

  const progress = frame / durationInFrames;

  const currentLine = Math.floor(progress * text.length);

  const lineProgress = (progress * text.length) % 1;

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
        {text.map((t, i) => (
          <Line
            progress={lineProgress}
            key={i}
            lineIndex={i}
            text={t}
            width={width}
            active={currentLine == i}
          />
        ))}
      </div>
      {animatedEmoji && <AnimatedEmoji {...animatedEmoji} />}
    </Sequence>
  );
};
