import React from "react";
import PieShape from "@visx/shape/lib/shapes/Pie";

export const Pie = ({
  width,
  height,
  data,
}: {
  width: number;
  height: number;
  data: unknown[];
}) => {
  return (
    <svg width={width} height={height}>
      <PieShape data={data} />
    </svg>
  );
};
