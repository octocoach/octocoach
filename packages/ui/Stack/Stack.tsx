import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  align,
  children,
  spacing,
  direction = "vertical",
}: PropsWithChildren<StackVariants>) => (
  <div className={stack({ align, spacing, direction })}>{children}</div>
);
