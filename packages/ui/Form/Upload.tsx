"use client";

import { ChangeEvent } from "react";
import { FileSelect } from "./FileSelect";

export default function Upload({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const onSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      throw new Error("No files selected");
    }
    const file = event.target.files[0];
    const response = await fetch(`/api/blob?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = await response.json();

    onUploaded(newBlob.url);
  };

  return <FileSelect onSelect={onSelect} />;
}
