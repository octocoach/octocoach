import * as React from "react";

import { card, CardVariants } from "./card.css";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CardVariants>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={card(props)}>
      {children}
    </div>
  );
});
