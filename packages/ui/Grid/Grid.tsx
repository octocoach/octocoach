import React from "react";
import { GridVariants, grid } from "./grid.css";

type GridTypes = GridVariants &
  Partial<{
    templateColumns: number;
  }>;

export const Grid = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<GridTypes>
>(({ children, templateColumns, ...props }, ref) => {
  return (
    <div ref={ref} className={grid(props)}>
      {children}
    </div>
  );
});
