import React from "react";
import { GridVariants, grid } from "./grid.css";

export const Grid = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<GridVariants>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={grid(props)}>
      {children}
    </div>
  );
});
