"use client";

import * as Ariakit from "@ariakit/react";
import React, { PropsWithChildren, useTransition } from "react";

type FormProps = PropsWithChildren<{
  store?: Ariakit.FormStore;
  formStoreProps?: Ariakit.FormStoreProps;
  onSubmit?: (data: any) => Promise<void>;
}>;

export const Form: React.FC<FormProps> = ({
  children,
  store,
  formStoreProps,
  onSubmit,
}) => {
  const [isPending, startTransition] = useTransition();

  if (!store) {
    if (!formStoreProps)
      throw new Error("You must either provide a store or formStoreProps");
    store = Ariakit.useFormStore(formStoreProps);
  }

  if (onSubmit) {
    store.useSubmit(async (state) => {
      startTransition(() => {
        onSubmit(state.values);
      });
    });
  }

  return (
    <Ariakit.Form store={store} resetOnSubmit={false}>
      {children}
    </Ariakit.Form>
  );
};
