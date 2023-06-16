import { ReactNode } from "react";
import { card } from "./card.css";

export const Card = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <div className={card()} {...props}>
      {children}
    </div>
  );
};
