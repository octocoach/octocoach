import { PropsWithChildren } from "react";
import { TextVariants, text } from "./text.css";

type AllowedElements = "h1" | "h2" | "p" | "span";

export const Text = ({
  children,
  element = "p",
  size = "m",
  ...props
}: PropsWithChildren<{ element?: AllowedElements } & TextVariants>) => {
  const Component = element;
  return (
    <Component className={text({ size })} {...props}>
      {children}
    </Component>
  );
};
