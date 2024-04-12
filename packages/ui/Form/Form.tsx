"use client";

import { FormStoreValues } from "@ariakit/core/form/form-store";
import * as Ariakit from "@ariakit/react";
import { ReactNode, startTransition } from "react";

type FormProps<T extends FormStoreValues> = {
  children: ReactNode;
  store: Ariakit.FormStore<T>;
  onSubmit?: (data: T) => Promise<void> | void;
};

export const Form = <T extends FormStoreValues>({
  children,
  store,
  onSubmit,
}: FormProps<T>) => {
  if (onSubmit) {
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

type FormWithStoreProps<T extends FormStoreValues> = {
  children: ReactNode;
  defaultValues: T;
  onSubmit?: (data: T) => Promise<void> | void;
};

export const FormWithStore = <T extends FormStoreValues>({
  children,
  defaultValues,
  onSubmit,
}: FormWithStoreProps<T>) => {
  const store = Ariakit.useFormStore<T>({ defaultValues });

  return (
    <Form store={store} onSubmit={onSubmit}>
      {children}
    </Form>
  );
};
