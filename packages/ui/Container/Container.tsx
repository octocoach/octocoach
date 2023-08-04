import { PropsWithChildren } from "react";
import { container } from "./container.css";

type AllowedElement = "div" | "section" | "main" | "article" | "header" | "nav";

export const Container = ({
  children,
  id,
  element = "div",
}: PropsWithChildren<{
  element: AllowedElement;
  id?: string;
}>) => {
  const Component = element;
  return (
    <Component id={id} className={container}>
      {children}
    </Component>
  );
};
