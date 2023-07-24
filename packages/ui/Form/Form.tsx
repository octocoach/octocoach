"use client";

import * as Ariakit from "@ariakit/react";
import { PropsWithChildren } from "react";

export const Form = ({
  children,
  formStoreProps,
  onSubmit,
}: PropsWithChildren<{
  formStoreProps: Ariakit.FormStoreProps;
  onSubmit: (data: any) => Promise<void>;
}>) => {
  const store = Ariakit.useFormStore(formStoreProps);

  store.useSubmit(async (state) => {
    onSubmit(state.values);
  });

  return <Ariakit.Form store={store}>{children}</Ariakit.Form>;
};
