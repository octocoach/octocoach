"use client";

import { scaleSqrt } from "@visx/scale";
import { Text } from "@visx/text";
import { Wordcloud } from "@visx/wordcloud";
import { React, useEffect, useState } from "react";

interface Word {
  text: string;
  value: number;
}

export const WC = ({
  words,
  container,
  ...props
}: {
  words: Word[];
  container: string;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const width = document
      ? document.getElementById(container)?.clientWidth || 0
      : 0;
    setWidth(width);
  }, []);

  if (!width) return null;

  const fontScale = scaleSqrt({
    domain: [
      Math.min(...words.map(({ value }) => value)),
      Math.max(...words.map(({ value }) => value)),
    ],
    range: [8, 32],
  });

  const fontSize = (word: Word) => fontScale(word.value);

  return (
    <Wordcloud
      words={words}
      height={800}
      width={width}
      font="Recursive"
      spiral="rectangular"
      padding={1}
      fontSize={fontSize}
      {...props}
    >
      {(cloudWords) =>
        cloudWords.map((word) => (
          <Text
            key={word.text}
            x={word.x}
            y={word.y}
            fontSize={word.size}
            fill="#ffffff"
            fontFamily={word.font}
            textAnchor={"middle"}
          >
            {word.text}
          </Text>
        ))
      }
    </Wordcloud>
  );
};
