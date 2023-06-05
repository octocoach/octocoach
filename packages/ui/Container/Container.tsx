import { PropsWithChildren } from "react";
import { container } from "./container.css";

type AllowedElement = "div" | "section" | "main" | "article";

export const Container = ({
  children,
  element = "div",
}: PropsWithChildren<{
  element: AllowedElement;
}>) => {
  const Component = element;
  return <Component className={container}>{children}</Component>;
};
