"use client";

import * as Ariakit from "@ariakit/react";
import { field, input } from "./field.css";
import { Text } from "../Text/Text";

export type FormInputTypes = "FormInput" | "FormField";

export const FormField = ({
  inputType,
  label,
  name,
}: {
  inputType: FormInputTypes;
  label: string;
  name: string;
}) => {
  const Component = Ariakit[inputType];

  return (
    <div className={field}>
      <Ariakit.FormLabel name={name}>
        <Text>{label}</Text>
      </Ariakit.FormLabel>
      <Component type="text" className={input} name={name} />
      <Ariakit.FormError name={name} />
    </div>
  );
};
