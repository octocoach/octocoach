"use client";

import type { OrgAccount } from "@octocoach/db/schemas/org/account";
import { Stack, Text } from "@octocoach/ui";

export default function UserAccount({ accounts }: { accounts: OrgAccount[] }) {
  return (
    <Stack>
      {accounts.map(({ provider, providerAccountId }) => (
        <Text key={providerAccountId}>{provider}</Text>
      ))}
    </Stack>
  );
}
