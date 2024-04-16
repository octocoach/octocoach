import * as React from "react";

import { box, BoxVariants } from "./box.css";

export const Box = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<BoxVariants>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={box(props)}>
      {children}
    </div>
  );
});
