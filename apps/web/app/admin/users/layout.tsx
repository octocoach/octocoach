import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Stack spacing="tight">
      <Link href="/admin/users">
        <Text weight="light">Users</Text>
      </Link>
      <div>{children}</div>
    </Stack>
  );
}
