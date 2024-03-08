import * as Ariakit from "@ariakit/react";
import { PropsWithChildren, forwardRef } from "react";
import { StringLike } from "../types";

export interface FormCheckboxGroupProps
  extends PropsWithChildren<Ariakit.FormGroupProps> {
  name: StringLike;
  label?: string;
}

export const FormCheckboxGroup = forwardRef<
  HTMLDivElement,
  FormCheckboxGroupProps
>(({ children, label, name }, ref) => {
  const form = Ariakit.useFormContext();
  if (!form) throw new Error("FormCheckboxGroup must be used within a Form");

  const onSetValue = (value: any) => {
    form.setValue(name, value);
  };

  const currentValue = form.getValue(name);

  return (
    <Ariakit.CheckboxProvider
      setValue={onSetValue}
      defaultValue={Array.isArray(currentValue) ? currentValue : []}
    >
      <Ariakit.Group ref={ref}>
        {label && <Ariakit.GroupLabel>{label}</Ariakit.GroupLabel>}
        {children}
      </Ariakit.Group>
    </Ariakit.CheckboxProvider>
  );
});
