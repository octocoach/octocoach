import { ElementType } from "react";
import { Text } from "../Text/Text";
import { ButtonVariants, button } from "./button.css";

type Props = {
  Element: ElementType;
  text: string;
  href: string;
} & ButtonVariants;

export const ButtonLink = ({ Element, text, href, color }: Props) => {
  return (
    <Element href={href}>
      <div className={button({ color })}>
        <Text>{text}</Text>
      </div>
    </Element>
  );
};
