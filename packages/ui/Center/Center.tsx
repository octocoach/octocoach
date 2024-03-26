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
        width: w ? w : "100%",
        height: h ? h : "100%",
      }}
    >
      {children}
    </div>
  );
};
