"use client";

import { PropsWithChildren, useRef } from "react";
import { useButton, AriaButtonProps } from "react-aria";
import { ButtonVariants, button } from "./button.css";

export const Button = ({
  color,
  children,
  ...props
}: PropsWithChildren<
  JSX.IntrinsicElements["button"] & AriaButtonProps & ButtonVariants
>) => {
  const ref = useRef(null);

  const { buttonProps } = useButton(props, ref);

  return (
    <button
      className={button({
        color,
      })}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
