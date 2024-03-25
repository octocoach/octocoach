"use client";

import { OrgAccount } from "@octocoach/db/schemas/org/account";
import { Button } from "@octocoach/ui";
import { useState, useTransition } from "react";

export const RefreshToken = ({
  refreshGoogleToken,
}: {
  refreshGoogleToken: () => Promise<OrgAccount>;
}) => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<OrgAccount>();

  const onRefresh = () => {
    startTransition(() => {
      refreshGoogleToken().then((result) => setResult(result));
    });
  };
  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <Button onClick={onRefresh} disabled={isPending}>
        Refresh
      </Button>
    </div>
  );
};
