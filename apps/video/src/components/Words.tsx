import { interpolateStyles } from "@remotion/animation-utils";
import { random, Series, useCurrentFrame } from "remotion";
import { z } from "zod";

import { accentColors } from "../helpers";

const wordsPropsSchema = z.object({
  text: z.array(z.string()),
  durationInFrames: z.number(),
});

export const wordsSchema = z.object({
  type: z.literal("words"),
  props: wordsPropsSchema,
});

const Sentence = ({
  children,
  wordDuration,
}: {
  children: string;
  wordDuration: number;
}) => {
  const frame = useCurrentFrame();
  const progress = frame / wordDuration;

  const style = interpolateStyles(
    progress,
    [0, 1],
    [
      { fontWeight: 300, fontSize: 60, fontVariationSettings: `'CASL' ${0}` },
      { fontWeight: 900, fontSize: 80, fontVariationSettings: `'CASL' ${1}` },
    ],
  );

  const colorId = Math.floor(random(`word-${children}`) * accentColors.length);
  const color = accentColors[colorId];

  return (
    <h1
      style={{
        ...style,
        color,
        textAlign: "center",
        padding: 20,
        textWrap: "nowrap",
      }}
    >
      {children}
    </h1>
  );
};

export const Words = ({
  text,
  durationInFrames,
}: z.infer<typeof wordsPropsSchema>) => {
  if (text.length <= 0) return null;

  const wordsDuration = durationInFrames / text.length;

  return (
    <Series>
      {text.map((words, i) => (
        <Series.Sequence key={i} durationInFrames={wordsDuration} layout="none">
          <Sentence wordDuration={wordsDuration}>{words}</Sentence>
        </Series.Sequence>
      ))}
    </Series>
  );
};
