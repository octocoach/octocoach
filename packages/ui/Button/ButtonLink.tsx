import { ElementType, ReactNode } from "react";
import { Text } from "../Text/Text";
import { ButtonVariants, button } from "./button.css";

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
      <div className={button(props)}>
        {text ? <Text>{text}</Text> : children}
      </div>
    </Element>
  );
};
