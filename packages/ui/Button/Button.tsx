import * as Ariakit from "@ariakit/react";
import * as React from "react";
import { ButtonVariants, button } from "./button.css";

import { ButtonProps } from "@ariakit/react/button";

type Props = ButtonProps & ButtonVariants;

export const Button: React.FC<Props> = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ children, fill, outline, size, ...props }, ref) => {
  return (
    <Ariakit.Button
      className={button({ fill, outline, size })}
      ref={ref}
      {...props}
    >
      {children}
    </Ariakit.Button>
  );
});
