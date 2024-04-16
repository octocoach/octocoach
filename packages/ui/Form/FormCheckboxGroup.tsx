import { CheckboxStoreValue } from "@ariakit/core/checkbox/checkbox-store";
import * as Ariakit from "@ariakit/react";
import { forwardRef, PropsWithChildren } from "react";

import { StringLike } from "../types";

export interface FormCheckboxGroupProps
  extends PropsWithChildren<Ariakit.FormGroupProps> {
  name?: StringLike;
  label?: string;
  setValue?: (value: CheckboxStoreValue) => void;
  getValue?: () => CheckboxStoreValue;
}

export const FormCheckboxGroup = forwardRef<
  HTMLDivElement,
  FormCheckboxGroupProps
>(({ children, label, name, getValue, setValue }, ref) => {
  const store = Ariakit.useFormContext();
  if (!store) throw new Error("FormCheckboxGroup must be used within a Form");

  const onSetValue = setValue
    ? setValue
    : (value: CheckboxStoreValue) => {
        if (!name)
          throw new Error("You must either provide a `setValue` or a `name`");
        store.setValue(name, value);
      };

  const getCurrentValue = () => {
    if (getValue) return getValue();

    if (!name)
      throw new Error("You must either provide a `getValue` or a `name`");

    return store.getValue<CheckboxStoreValue>(name);
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
