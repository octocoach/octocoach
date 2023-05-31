"use client";

import { forwardRef } from "react";
import { ButtonVariants, button } from "./button.css";

export const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & ButtonVariants
>((props, ref) => {
  const { color, children } = props;

  return (
    <button
      className={button({
        color,
      })}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
