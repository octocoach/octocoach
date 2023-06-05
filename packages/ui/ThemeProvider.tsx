import { ReactNode } from "react";
import { themeClass } from "./theme.css";

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <div className={themeClass.frappe}>{children}</div>
);
