import { clerkClient } from "@clerk/nextjs/server";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const users = await clerkClient.users.getUserList();

  return (
    <Stack>
      {users.map((user) => {
        return (
          <Text key={user.id}>
            <Link href={`/admin/users/${user.id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </Text>
        );
      })}
    </Stack>
  );
}
