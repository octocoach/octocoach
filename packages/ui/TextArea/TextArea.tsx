"use client";

import { useRef } from "react";
import { useTextField, type AriaTextFieldProps } from "react-aria";
import { textarea, textareaContainer } from "./textarea.css";

export const TextArea = (props: AriaTextFieldProps) => {
  const ref = useRef(null);
  const { label } = props;
  const { labelProps, inputProps } = useTextField<"textarea">(props, ref);

  return (
    <div className={textareaContainer}>
      <label {...labelProps}>{label}</label>
      <textarea {...inputProps} ref={ref} className={textarea} />
    </div>
  );
};
