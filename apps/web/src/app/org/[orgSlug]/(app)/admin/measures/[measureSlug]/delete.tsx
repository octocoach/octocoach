"use client";

import { Measure } from "@octocoach/db/schemas/org/measure";
import { Button } from "@octocoach/ui";
import { useTransition } from "react";

export const Delete = ({
  deleteAction,
  id,
}: {
  deleteAction: (id: Measure["id"]) => Promise<{ success: boolean }>;
  id: Measure["id"];
}) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(() => {
      deleteAction(id);
    });
  };

  return (
    <Button onClick={onDelete} disabled={isPending}>
      Delete
    </Button>
  );
};
