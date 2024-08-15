"use client";

import { Module } from "@octocoach/db/schemas/org/module";
import { Button } from "@octocoach/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const Delete = ({
  deleteAction,
  id,
}: {
  deleteAction: (id: Module["id"]) => Promise<{ success: boolean }>;
  id: Module["id"];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      void deleteAction(id).then(() => router.refresh());
    });
  };

  return (
    <Button onClick={onDelete} disabled={isPending} color="error">
      Delete
    </Button>
  );
};
