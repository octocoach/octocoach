import React from "react";
import { BarStackHorizontal as BarStackHorizontalShape } from "@visx/shape";
import { scaleLinear } from "@visx/scale";

export type BarStackItem = Record<number, number>;

const numericScale = scaleLinear({
  domain: [0, 1],
  range: [0, 100],
});

export const BarStackHorizontal = ({ data }: { data: BarStackItem[] }) => {
  console.log(data);
  return (
    <svg>
      <BarStackHorizontalShape<BarStackItem, number>
        data={data}
        height={100}
        y={(d) => d[1]}
        xScale={numericScale}
        yScale={numericScale}
        color={() => "red"}
      >
        {(barStacks) => {
          console.log("barStacks");
          return barStacks.map((barStack) =>
            barStack.bars.map((bar) => (
              <rect x={bar.x} y={bar.y} width={bar.width} />
            ))
          );
        }}
      </BarStackHorizontalShape>
    </svg>
  );
};
