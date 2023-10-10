"use client";

import * as Ariakit from "@ariakit/react";
import { PropsWithChildren } from "react";

export const Form = ({
  children,
  store,
  formStoreProps,
  onSubmit,
}: PropsWithChildren<{
  store?: Ariakit.FormStore;
  formStoreProps?: Ariakit.FormStoreProps;
  onSubmit: (data: any) => Promise<void>;
}>) => {
  if (!store) {
    if (!formStoreProps)
      throw new Error("You must either provide a store or formStoreProps");
    store = Ariakit.useFormStore(formStoreProps);
  }

  store.useSubmit(async (state) => {
    onSubmit(state.values);
  });

  return <Ariakit.Form store={store}>{children}</Ariakit.Form>;
};
