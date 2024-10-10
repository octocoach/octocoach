"use client";

import { Toaster, ToasterProps } from "sonner";

import { toastClass } from "./toast.css";

export { toast } from "sonner";

export const Toast = (props: ToasterProps) => {
  return (
    <Toaster
      {...props}
      toastOptions={{
        className: toastClass,
      }}
    />
  );
};
