"use client";

import { Button, Stack, Text } from "@octocoach/ui";
import { PutBlobResult } from "@vercel/blob";
import { useRef, useState } from "react";

export default function Upload() {
  const ref = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  return (
    <Stack>
      <Text>Upload a file</Text>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!ref.current?.files) {
            throw new Error("No file selected");
          }

          const file = ref.current.files[0];

          const response = await fetch(`/api/blob?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input name="file" type="file" ref={ref} />
        <Button type="submit">Upload</Button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </Stack>
  );
}
