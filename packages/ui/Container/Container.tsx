import { PropsWithChildren } from "react";
import { container } from "./container.css";
import { Properties } from "csstype";
type AllowedElement = "div" | "section" | "main" | "article" | "header" | "nav";

export const Container = ({
  children,
  id,
  element = "div",
  display = "block",
}: PropsWithChildren<{
  element: AllowedElement;
  id?: string;
  display?: Properties["display"];
}>) => {
  const Component = element;
  return (
    <Component id={id} className={container} style={{ display }}>
      {children}
    </Component>
  );
};
