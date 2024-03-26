import * as Ariakit from "@ariakit/react";
import { PropsWithChildren, forwardRef } from "react";
import { StringLike } from "../types";

export interface FormCheckboxGroupProps
  extends PropsWithChildren<Ariakit.FormGroupProps> {
  store?: Ariakit.FormStore;
  name?: StringLike;
  label?: string;
  setValue?: (value: any) => void;
  getValue?: () => any;
}

export const FormCheckboxGroup = forwardRef<
  HTMLDivElement,
  FormCheckboxGroupProps
>(({ children, label, name, store, getValue, setValue }, ref) => {
  const form = store || Ariakit.useFormContext();
  if (!form) throw new Error("FormCheckboxGroup must be used within a Form");

  const onSetValue = setValue
    ? setValue
    : (value: any) => {
        if (!name)
          throw new Error("You must either provide a `setValue` or a `name`");
        form.setValue(name, value);
      };

  const getCurrentValue = () => {
    if (getValue) return getValue();

    if (!name)
      throw new Error("You must either provide a `getValue` or a `name`");

    return form.getValue(name);
  };

  const currentValue = getCurrentValue();

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
