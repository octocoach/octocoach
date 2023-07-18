import { PropsWithChildren } from "react";
import { TagVariants, tag } from "./tag.css";

export const Tag = ({ children, ...props }: PropsWithChildren<TagVariants>) => (
  <div className={tag(props)}>{children}</div>
);
