import { PropsWithChildren } from "react";

import { text, TextVariants } from "./text.css";

type AllowedElements = "h1" | "h2" | "p" | "span";

export const Text = ({
  children,
  width,
  element = "p",
  ...props
}: PropsWithChildren<
  { element?: AllowedElements; width?: number } & TextVariants
>) => {
  const Component = element;
  return (
    <Component className={text(props)} style={{ width }}>
      {children}
    </Component>
  );
};
