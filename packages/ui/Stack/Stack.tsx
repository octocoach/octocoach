import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  align,
  children,
  spacing,
  direction = "vertical",
  wrap = false,
}: PropsWithChildren<StackVariants>) => (
  <div className={stack({ align, spacing, direction, wrap })}>{children}</div>
);
