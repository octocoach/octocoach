import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { StringLike } from "../types";
import { Text } from "..";
import { formCheckbox } from "./formCheckbox.css";

export interface FormCheckboxProps extends Ariakit.FormCheckboxProps {
  name: StringLike;
  label: string;
}
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, ...props }, ref) => (
    <label className={formCheckbox}>
      <Ariakit.FormCheckbox ref={ref} {...props} clickOnEnter />
      <Text>{label}</Text>
    </label>
  )
);
