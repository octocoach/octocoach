import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  align,
  children,
  spacing,
}: PropsWithChildren<StackVariants>) => (
  <div className={stack({ align, spacing })}>{children}</div>
);
