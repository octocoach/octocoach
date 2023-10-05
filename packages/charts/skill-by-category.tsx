"use client";

import {
  type SkillLevel,
  skillLevelEnum,
} from "@octocoach/db/schemas/common/skill-level";
import { Text, vars } from "@octocoach/ui";
import { AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStackHorizontal } from "@visx/shape";
import { useParentWidth } from "./hooks";

export type CategoryLevels = {
  category: string;
} & Record<SkillLevel, number>;

export const SkillByCategory = ({
  data,
  containerId,
}: {
  data: { category: string; skillLevel: SkillLevel }[];
  containerId: string;
}) => {
  const width = useParentWidth(containerId);

  const categoryLevels: Record<string, CategoryLevels> = {};

  data.forEach(({ category, skillLevel }) => {
    const currrentLevels = categoryLevels[category];
    if (currrentLevels) {
      currrentLevels[skillLevel] = currrentLevels[skillLevel] + 1;
      categoryLevels[category] = { ...currrentLevels };
    } else {
      let newLevels: CategoryLevels = {
        category,
        ...(Object.fromEntries<number>(
          skillLevelEnum.enumValues.map((s) => [s, s === skillLevel ? 1 : 0])
        ) as Record<SkillLevel, number>),
      };

      categoryLevels[category] = newLevels;
    }
  });

  const isNumber = (d: number | string): d is number => typeof d === "number";

  const totals: number[] = Object.values(categoryLevels).map(
    (levels) =>
      Object.values(levels).reduce(
        (acc, curr) => (isNumber(curr) && isNumber(acc) ? acc + curr : acc),
        0
      ) as number
  );

  const numCategories = totals.length;

  const fontSize = 16;

  const height = numCategories * fontSize * 3;

  const xScale = scaleLinear({
    domain: [0, Math.max(...totals)],
    nice: true,
    range: [0, width],
  });

  const yScale = scaleBand<string>({
    domain: Object.keys(categoryLevels),
    padding: 0.2,
    range: [height, 0],
  });

  const colorScale = scaleOrdinal({
    domain: skillLevelEnum.enumValues,
    range: [
      vars.color.accent.normal,
      vars.color.brand.normal,
      vars.color.typography.success,
      vars.color.typography.warning,
      vars.color.typography.error,
    ],
  });

  return (
    <div>
      <Text>Skill By Category</Text>
      <svg width={width} height={height}>
        <BarStackHorizontal
          data={Object.values(categoryLevels)}
          keys={skillLevelEnum.enumValues}
          height={height}
          xScale={xScale}
          y={({ category }) => category}
          color={colorScale}
          yScale={yScale}
        >
          {(barStacks) => {
            return barStacks.map(({ bars }) =>
              bars.map((bar) => (
                <rect
                  x={bar.x}
                  y={bar.y + bar.height * 0.9}
                  width={bar.width <= 10 ? 10 : bar.width}
                  fill={bar.color}
                  key={`${bar.key}-${bar.index}`}
                  height={10}
                  rx={5}
                  opacity={0.5}
                />
              ))
            );
          }}
        </BarStackHorizontal>
        <AxisLeft
          scale={yScale}
          tickStroke="white"
          tickFormat={(d) => d}
          tickLabelProps={{
            fill: vars.color.typography.body,
            fontFamily: vars.fonts.base,
            fontSize,
            textAnchor: "start",
            dx: "0.5em",
          }}
          numTicks={numCategories}
        />
      </svg>
    </div>
  );
};
