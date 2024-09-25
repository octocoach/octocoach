import { interpolateStyles } from "@remotion/animation-utils";
import { useMemo } from "react";
import { random, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

import { accentColors } from "../helpers";

const wordsPropsSchema = z.object({
  text: z.string(),
  wpm: z.number(),
});

export const wordsSchema = z.object({
  type: z.literal("words"),
  props: wordsPropsSchema,
});

const splitAndFilterEmpty = (text: string) =>
  text
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

export const calculateWordsDuration = (
  { text, wpm }: z.infer<typeof wordsPropsSchema>,
  fps: number,
) => {
  const words = splitAndFilterEmpty(text).length;
  const secondsPerWord = 60 / wpm || 200;
  const durationInSeconds = words * secondsPerWord;

  if (
    durationInSeconds === 0 ||
    isNaN(durationInSeconds) ||
    durationInSeconds === Infinity
  )
    return 1;

  return Math.round(durationInSeconds * fps);
};

const Word = ({
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

  return <h1 style={{ ...style, color }}>{children}</h1>;
};

export const Words = (props: z.infer<typeof wordsPropsSchema>) => {
  const { fps } = useVideoConfig();
  const words = useMemo(() => splitAndFilterEmpty(props.text), [props.text]);
  const durationInFrames = calculateWordsDuration(props, fps);
  const wordDuration = durationInFrames / words.length;

  return (
    <Series>
      {words.map(
        (word, i) =>
          word.length && (
            <Series.Sequence
              key={i}
              durationInFrames={wordDuration}
              layout="none"
            >
              <Word wordDuration={wordDuration}>{word}</Word>
            </Series.Sequence>
          ),
      )}
    </Series>
  );
};
