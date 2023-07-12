import { PropsWithChildren } from "react";
import { TypographyVariants, typography } from "./typography.css";

type AllowedElements = "h1" | "h2" | "p" | "span";

export const Typography = ({
  children,
  element = "p",
  size = "m",
  ...props
}: PropsWithChildren<{ element?: AllowedElements } & TypographyVariants>) => {
  const Component = element;
  return (
    <Component className={typography({ size })} {...props}>
      {children}
    </Component>
  );
};
