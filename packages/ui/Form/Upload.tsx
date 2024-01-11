"use client";

import { ChangeEvent } from "react";
import { FileSelect } from "./FileSelect";

export default function Upload({
  onUploaded,
  orgSlug,
}: {
  onUploaded: (url: string) => void;
  orgSlug?: string;
}) {
  const onSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      throw new Error("No files selected");
    }
    const file = event.target.files[0];
    let url = `/api/blob?filename=${file.name}`;
    if (orgSlug) {
      url += `&orgSlug=${orgSlug}`;
    }

    const response = await fetch(url, {
      method: "POST",
      body: file,
    });

    const newBlob = await response.json();

    onUploaded(newBlob.url);
  };

  return <FileSelect onSelect={onSelect} />;
}
