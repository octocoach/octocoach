import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { Text } from "../Text/Text";
import { checkbox } from "./checkbox.css";

export interface CheckboxProps extends Ariakit.CheckboxProps {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => (
    <label className={checkbox}>
      <Ariakit.Checkbox ref={ref} {...props} />
      <Text>{label}</Text>
    </label>
  )
);
