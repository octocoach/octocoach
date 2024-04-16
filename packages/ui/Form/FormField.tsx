"use client";

import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { Text } from "../Text/Text";
import { formField } from "./formField.css";

export interface FormFieldProps extends ComponentPropsWithoutRef<"div"> {
  name: Ariakit.FormFieldProps["name"];
  label: string;
  grow?: boolean;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, name, label, grow, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={formField({ grow })}>
        <Ariakit.FormLabel name={name}>
          <Text>{label}</Text>
        </Ariakit.FormLabel>
        {children}
        <Ariakit.FormError name={name} />
      </div>
    );
  }
);
