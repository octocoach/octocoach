"use client";

import * as Ariakit from "@ariakit/react";

export const HiddenInput = ({ name }: { name: string }) => {
  return <Ariakit.FormInput name={name} hidden aria-hidden />;
};
