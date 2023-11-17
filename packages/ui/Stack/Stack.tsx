import { PropsWithChildren } from "react";
import { StackVariants, stack } from "./stack.css";

export const Stack = ({
  children,
  id,
  ...props
}: PropsWithChildren<StackVariants & { id?: string }>) => (
  <div id={id} className={stack(props)}>
    {children}
  </div>
);
