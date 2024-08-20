import * as Ariakit from "@ariakit/react";
import { ButtonProps } from "@ariakit/react/button";
import * as React from "react";

import { button, ButtonVariants } from "./button.css";

type Props = ButtonProps & ButtonVariants;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, color, glow, size, ...props }, ref) => {
    return (
      <Ariakit.Button
        className={button({ color, glow, size })}
        ref={ref}
        {...props}
      >
        {children}
      </Ariakit.Button>
    );
  }
);
