"use client";
import { ChangeEvent } from "react";
import { fileSelectContainer } from "./fileSelect.css";

export const FileSelect = ({
  onSelect,
}: {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}) => {
  return (
    <span className={fileSelectContainer}>
      <input
        type="file"
        onChange={(ev) => {
          void onSelect(ev);
        }}
      />
    </span>
  );
};
