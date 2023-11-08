"use client";

import { FileSelect } from "@octocoach/ui";
import { PutBlobResult } from "@vercel/blob";
import { ChangeEvent } from "react";

export default function Upload({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const onSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const response = await fetch(`/api/blob?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    onUploaded(newBlob.url);
  };

  return <FileSelect onSelect={onSelect} />;
}
