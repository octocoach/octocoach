import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";

export const FormDateTimeInput = forwardRef<
  HTMLInputElement,
  Ariakit.FormInputProps
>((props, ref) => (
  <div>
    <Ariakit.FormInput ref={ref} {...props} type="datetime-local" />
  </div>
));
