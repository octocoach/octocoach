"use client";

import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Text } from "../Text/Text";
import { formField } from "./formField.css";

export interface FormFieldProps extends ComponentPropsWithoutRef<"div"> {
  name: Ariakit.FormFieldProps["name"];
  label: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, name, label, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={formField}>
        <Ariakit.FormLabel name={name}>
          <Text>{label}</Text>
        </Ariakit.FormLabel>
        {children}
        <Ariakit.FormError name={name} />
      </div>
    );
  }
);
