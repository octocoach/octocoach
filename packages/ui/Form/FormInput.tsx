import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { clsx } from "clsx";
import { formInput, formInputWrapper } from "./formInput.css";
import { Text } from "../Text/Text";

export interface FormInputProps extends Ariakit.FormInputProps {
  suffix?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ suffix, ...props }, ref) => (
    <div className={formInputWrapper}>
      <Ariakit.FormInput
        ref={ref}
        {...props}
        className={clsx(formInput, props.className)}
      />
      {suffix ? <Text>{suffix}&nbsp;</Text> : null}
    </div>
  )
);
