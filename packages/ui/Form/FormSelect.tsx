"use client";

import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";

import { Select, type SelectProps } from "../Select/Select";

export interface FormSelectProps
  extends Ariakit.FormFieldProps<"button">,
    Omit<SelectProps, keyof Ariakit.FormFieldProps<"button">> {
  displayValue?: string;
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  ({ name, displayValue, ...props }, ref) => {
    const form = Ariakit.useFormContext();
    if (!form) throw new Error("FormSelect must be used within a Form");

    const value = form.useValue<string | undefined>(name);

    const select = (
      <Select
        ref={ref}
        value={value}
        displayValue={displayValue}
        setValue={(value) => {
          if (props.setValue) {
            props.setValue(value);
          }
          form.setValue(name, value);
        }}
        render={props.render}
        buttonStyle={props.buttonStyle}
      />
    );
    const field = <Ariakit.FormField name={name} render={select} />;
    return <Ariakit.Role.button {...props} render={field} />;
  }
);
