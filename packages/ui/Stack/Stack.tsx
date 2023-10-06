import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  align,
  justify,
  children,
  spacing,
  direction = "vertical",
  wrap = false,
  id,
}: PropsWithChildren<StackVariants & { id?: string }>) => (
  <div id={id} className={stack({ align, justify, spacing, direction, wrap })}>
    {children}
  </div>
);
