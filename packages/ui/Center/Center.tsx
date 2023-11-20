import { ReactNode } from "react";
import { center } from "./center.css";

export const Center = ({
  children,
  w,
  h,
}: {
  children: ReactNode;
  w?: number;
  h?: number;
}) => {
  return (
    <div
      className={center}
      style={{
        width: w ? w : "auto",
        height: h ? h : "auto",
      }}
    >
      {children}
    </div>
  );
};
