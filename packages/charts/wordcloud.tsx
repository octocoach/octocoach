"use client";

import { scaleSqrt, scaleLinear, scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { Wordcloud } from "@visx/wordcloud";
import { React, useEffect, useState } from "react";
import { vars } from "@octocoach/ui";
import debounce from "just-debounce-it";

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
    const parent = document.getElementById(container);

    setWidth(parent.clientWidth);

    const resizeHandler = debounce(() => {
      setWidth(parent.clientWidth);
    }, 500);

    window.addEventListener("resize", resizeHandler, true);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  if (!width) return null;

  const fontScale = scaleSqrt({
    domain: [
      Math.min(...words.map(({ value }) => value)),
      Math.max(...words.map(({ value }) => value)),
    ],
    range: [8, 32],
  });

  const opacityScale = scaleLog({
    domain: [8, 32],
    range: [0.5, 1],
  });

  const rotationScale = scaleLinear({
    domain: [0, 1],
    range: [-5, 5],
  });

  const fontSize = (word: Word) => fontScale(word.value);
  const fixedValueGenerator = () => 0.5;
  const getRotation = () => rotationScale(Math.random());

  return (
    <Wordcloud
      words={words}
      height={800}
      width={width}
      font="Recursive"
      spiral="archimedean"
      padding={1}
      fontSize={fontSize}
      random={fixedValueGenerator}
      rotate={getRotation}
      {...props}
    >
      {(cloudWords) =>
        cloudWords.map((word) => (
          <Text
            key={word.text}
            transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
            fontSize={word.size}
            fill={vars.color.typography.body}
            fontFamily={word.font}
            textAnchor={"middle"}
            style={{
              opacity: opacityScale(word.size),
              boxShadow: "0 0 3px #000",
            }}
          >
            {word.text}
          </Text>
        ))
      }
    </Wordcloud>
  );
};
