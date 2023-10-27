import { PropsWithChildren } from "react";
import { container } from "./container.css";
import { Properties } from "csstype";
type AllowedElement = "div" | "section" | "main" | "article" | "header" | "nav";

export const Container = ({
  children,
  id,
  element = "div",
  display = "block",
  justifyItems = "initial",
}: PropsWithChildren<
  Partial<{
    element: AllowedElement;
    id: string;
    display: Properties["display"];
    justifyItems: Properties["justifyItems"];
  }>
>) => {
  const Component = element;
  return (
    <Component id={id} className={container} style={{ display, justifyItems }}>
      {children}
    </Component>
  );
};
