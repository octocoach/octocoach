import { db } from "@octocoach/db/src/connection";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const users = await db.query.users.findMany({ with: {} });

  return (
    <Stack>
      {users.map((user) => (
        <Text>
          <Link href={`/admin/users/${user.id}`}>{user.id}</Link>
        </Text>
      ))}
    </Stack>
  );
}
