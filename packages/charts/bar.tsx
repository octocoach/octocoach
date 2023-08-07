import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import { vars } from "node_modules/@octocoach/ui";
import { useMemo } from "react";

interface BarChartItem {
  label: string;
  value: number;
}

export const BarChart = ({
  width,
  height,
  data,
}: {
  width: number;
  height: number;
  data: BarChartItem[];
}) => {
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, width],
        domain: data.map((i) => i.label),
      }),
    [data]
  );

  const yScale = useMemo(() =>
    scaleLinear<number>({
      range: [height, 0],
      round: true,
      domain: [0, Math.max(...data.map(({ value }) => value))],
    })
  );

  return (
    <svg width={width} height={height}>
      {data.map(({ value, label }) => {
        const barWidth = xScale.bandwidth() * 0.8;
        const barHeight = height - (yScale(value) ?? 0);
        return (
          <Group>
            <Bar
              x={xScale(label)}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              fill={vars.color.accent.normal}
            />
            <Text
              x={xScale(label) + 8}
              y={height - 8}
              fontFamily={vars.fonts.base}
              fill={vars.color.background.base}
            >
              {`${label} (${value})`}
            </Text>
          </Group>
        );
      })}
    </svg>
  );
};
