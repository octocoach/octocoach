"use client";

import { Stack, Text } from "@octocoach/ui";

export default function UserAccounts({
  accounts,
}: {
  accounts: { provider: string }[];
}) {
  return (
    <Stack>
      {accounts.map(({ provider }) => (
        <Text key={provider}>{provider}</Text>
      ))}
    </Stack>
  );
}
