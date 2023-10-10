"use client";

import * as Ariakit from "@ariakit/react";
import { Text } from "../Text/Text";
import { field, input } from "./field.css";

export type FormInputTypes = "FormInput" | "FormField";

export const FormField = ({
  inputType,
  label,
  name,
  pattern,
}: {
  inputType: FormInputTypes;
  label: string;
  name: string;
  pattern?: string;
}) => {
  const Component = Ariakit[inputType];

  return (
    <div className={field}>
      <Ariakit.FormLabel name={name}>
        <Text>{label}</Text>
      </Ariakit.FormLabel>
      <Component type="text" className={input} name={name} pattern={pattern} />
      <Ariakit.FormError name={name} />
    </div>
  );
};
