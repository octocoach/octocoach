import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  children,
  spacing,
}: PropsWithChildren<StackVariants>) => (
  <div className={stack({ align: "center", spacing })}>{children}</div>
);
