import { LegacyRef, PropsWithChildren } from "react";

import { stack, StackVariants } from "./stack.css";

export const Stack = ({
  children,
  id,
  ref,
  ...props
}: PropsWithChildren<
  StackVariants & { id?: string; ref?: LegacyRef<HTMLDivElement> }
>) => (
  <div id={id} className={stack(props)} ref={ref}>
    {children}
  </div>
);
