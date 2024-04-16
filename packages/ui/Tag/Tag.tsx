import { PropsWithChildren } from "react";

import { tag, TagVariants } from "./tag.css";

export const Tag = ({ children, ...props }: PropsWithChildren<TagVariants>) => (
  <div className={tag(props)}>{children}</div>
);
