"use client";

import { vars } from "@octocoach/ui";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import { useMemo } from "react";
import { useParentWidth } from "./hooks";

export interface BarChartItem {
  label: string;
  value: number;
}

export const BarChart = ({
  height,
  data,
  containerId,
}: {
  height: number;
  data: BarChartItem[];
  containerId: string;
}) => {
  const width = useParentWidth(containerId);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, width],
        domain: data.map((i) => i.label),
      }),
    [data, width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [height, 0],
        round: true,
        domain: [0, Math.max(...data.map(({ value }) => value))],
      }),
    [data, height]
  );

  return (
    <svg width={width} height={height}>
      {data.map(({ value, label }, key) => {
        const barWidth = xScale.bandwidth() * 0.8;
        const barHeight = height - (yScale(value) ?? 0);
        return (
          <Group key={key}>
            <Bar
              x={xScale(label)}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              fill={vars.color.accent.normal}
            />
            <Text
              x={(xScale(label) || 0) + 8}
              y={height - 8}
              fontFamily={vars.fonts.base}
              fill={vars.color.background.base.normal}
            >
              {`${label} (${value})`}
            </Text>
          </Group>
        );
      })}
    </svg>
  );
};
