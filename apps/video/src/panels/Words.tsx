import {
  interpolateStyles,
  makeTransform,
  scale,
} from "@remotion/animation-utils";
import { random, Series, useCurrentFrame } from "remotion";
import { z } from "zod";

import { accentColors } from "../helpers";

const wordsPropsSchema = z.object({
  text: z.array(z.string()),
  layout: z.enum(["sequential", "parallel"]),
  fontSize: z.number(),
});

export const wordsSchema = z.object({
  type: z.literal("words"),
  props: wordsPropsSchema,
});

const Sentence = ({
  children,
  wordDuration,
  fontSize,
}: {
  children: string;
  wordDuration: number;
  fontSize: number;
}) => {
  const frame = useCurrentFrame();
  const progress = frame / wordDuration;

  const transform = makeTransform([scale(1 + progress * 0.1)]);

  const style = interpolateStyles(
    progress,
    [0, 1],
    [
      { fontWeight: 300, fontVariationSettings: `'CASL' ${0}` },
      {
        fontWeight: 900,
        fontVariationSettings: `'CASL' ${1}`,
      },
    ],
  );

  const colorId = Math.floor(random(`word-${children}`) * accentColors.length);
  const color = accentColors[colorId];

  return (
    <h1
      style={{
        ...style,
        transform,
        color,
        fontSize,
        textAlign: "center",
        textWrap: "nowrap",
      }}
    >
      {children}
    </h1>
  );
};

export const Words = ({
  text,
  fontSize,
  layout,
  durationInFrames,
}: z.infer<typeof wordsPropsSchema> & { durationInFrames: number }) => {
  if (text.length <= 0) return null;

  if (layout === "sequential") {
    const wordsDuration = durationInFrames / text.length;
    return (
      <Series>
        {text.map((words, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={wordsDuration}
            layout="none"
          >
            <Sentence wordDuration={wordsDuration} fontSize={fontSize}>
              {words}
            </Sentence>
          </Series.Sequence>
        ))}
      </Series>
    );
  }

  if (layout === "parallel") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize,
        }}
      >
        {text.map((words, i) => (
          <div key={i}>{words}</div>
        ))}
      </div>
    );
  }
};
