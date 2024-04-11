"use client";

import { FormStoreProps, FormStoreValues } from "@ariakit/core/form/form-store";
import { AnyObject, PickRequired } from "@ariakit/core/utils/types";
import * as Ariakit from "@ariakit/react";
import { ReactNode, startTransition } from "react";

type RequiredFormStoreProps<T extends AnyObject> = PickRequired<
  FormStoreProps<T>,
  | "values"
  | "defaultValues"
  | "errors"
  | "defaultErrors"
  | "touched"
  | "defaultTouched"
>;

type FormProps<T extends FormStoreValues> = {
  children: ReactNode;
  store?: Ariakit.FormStore<T>;
  formStoreProps?: RequiredFormStoreProps<T>;
  onSubmit?: (data: T) => Promise<void> | void;
};

export const Form = <T extends FormStoreValues>({
  children,
  store,
  formStoreProps,
  onSubmit,
}: FormProps<T>) => {
  if (!store) {
    if (!formStoreProps)
      throw new Error("You must either provide a store or formStoreProps");

    store = Ariakit.useFormStore<T>(formStoreProps);
  }

  if (store && onSubmit) {
    store.useSubmit((state) => {
      startTransition(() => {
        void onSubmit(state.values);
      });
    });
  }

  return (
    <Ariakit.Form store={store} resetOnSubmit={false}>
      {children}
    </Ariakit.Form>
  );
};

export function createDefaultProps<T extends AnyObject>(
  values: T
): RequiredFormStoreProps<T> {
  return {
    defaultValues: values,
    defaultTouched: {},
    defaultErrors: {},
    defaultItems: [],
  };
}
