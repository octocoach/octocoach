import { PropsWithChildren } from "react";
import { ContainerVariants, container } from "./container.css";
type AllowedElement = "div" | "section" | "main" | "article" | "header" | "nav";

export const Container = ({
  children,
  id,
  element = "div",
  ...props
}: PropsWithChildren<
  ContainerVariants &
    Partial<{
      element: AllowedElement;
      id: string;
    }>
>) => {
  const Component = element;
  return (
    <Component id={id} className={container(props)}>
      {children}
    </Component>
  );
};
