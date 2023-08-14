"use client";

import { Text } from "@octocoach/ui";
import { AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { BarStackHorizontal } from "@visx/shape";
import { useState } from "react";

export type CategoryLevels = [number, number, number, number, number];

type SkillCategoryWithLevels = Record<string, CategoryLevels>;

export const SkillByCategory = ({
  data,
}: {
  data: { category: string; level: number }[];
}) => {
  const [width, setWidth] = useState(600);
  const height = 500;
  const categoryLevels: SkillCategoryWithLevels = {};

  data.forEach(({ category, level }) => {
    const currrentLevels = categoryLevels[category];
    if (currrentLevels) {
      currrentLevels[level] = currrentLevels[level] + 1;
      categoryLevels[category] = [...currrentLevels];
    } else {
      let newLevels: CategoryLevels = [0, 0, 0, 0, 0];
      newLevels[level] = 1;
      categoryLevels[category] = newLevels;
    }
  });

  const totals = Object.values(categoryLevels).map((levels) =>
    levels.reduce((acc, curr) => acc + curr, 0)
  );

  const max = Math.max(...totals);
  const xMax = width;

  const xScale = scaleLinear({
    domain: [0, max],
    nice: true,
    range: [0, xMax],
  });

  const yScale = scaleBand<string>({
    domain: Object.keys(categoryLevels),
    range: [height, 0],
  });

  console.log(categoryLevels);

  return (
    <div>
      <Text>Skill By Category</Text>
      <svg width={width} height={height}>
        <BarStackHorizontal
          data={Object.entries(categoryLevels).map(([category, levels]) => ({
            category,
            levels,
          }))}
          keys={Object.keys(categoryLevels)}
          height={height}
          xScale={xScale}
          y={(d) => d.category}
          color={() => "red"}
          yScale={yScale}
        >
          {(barStacks) => {
            console.log("barStacks", barStacks);
            return barStacks.map(({ bars }) =>
              bars.map((bar) => (
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  fill={bar.color}
                  key={`${bar.key}-${bar.index}`}
                  height={bar.height}
                />
              ))
            );
          }}
        </BarStackHorizontal>
        <AxisLeft
          scale={yScale}
          tickFormat={(d) => {
            console.log(d);
            return d.toString();
          }}
        />
      </svg>
    </div>
  );
};
