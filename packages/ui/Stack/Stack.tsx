import { ReactNode } from "react";
import { stack } from "./stack.css";

export const Stack = ({ children }: { children: ReactNode }) => (
  <div className={stack({ align: "center" })}>{children}</div>
);
