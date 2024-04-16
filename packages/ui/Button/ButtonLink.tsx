import { ElementType, ReactNode } from "react";

import { button, ButtonVariants } from "./button.css";

type Props = {
  Element: ElementType;
  href: string;
  text?: string;
  children?: ReactNode;
} & ButtonVariants;

export const ButtonLink = ({
  Element,
  text,
  href,
  children,
  ...props
}: Props) => {
  return (
    <Element href={href}>
      <div className={button(props)}>{text || children}</div>
    </Element>
  );
};
