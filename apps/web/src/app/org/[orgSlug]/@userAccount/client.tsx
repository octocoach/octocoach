"use client";

import { getUserAccounts } from "@octocoach/auth/adapters";
import { signIn } from "@octocoach/auth/react";
import { Button, Card, Stack, Text } from "@octocoach/ui";

export type AsyncReturnType<T extends (..._args: any) => Promise<any>> =
  Awaited<ReturnType<T>>;

export default function UserAccount({
  accounts,
}: {
  accounts: AsyncReturnType<typeof getUserAccounts>;
}) {
  return (
    <Stack>
      {Object.entries(accounts).map(([key, provider]) => (
        <Card key={key}>
          <Text>{provider.displayName}</Text>
          {!provider.dbAccount ? (
            <Button onClick={() => signIn(key)}>Link Account</Button>
          ) : null}
        </Card>
      ))}
    </Stack>
  );
}
