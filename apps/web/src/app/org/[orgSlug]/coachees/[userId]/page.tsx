import { orgDb } from "@octocoach/db/connection";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; userId: string };
}) {
  const db = orgDb(params.orgSlug);

  const user = await db.query.userTable.findFirst({
    where: ({ id }, { eq }) => eq(id, params.userId),
  });

  const currentPath = `/org/${params.orgSlug}/coachees/${params.userId}`;

  return (
    <Stack>
      <Text>{user.name}</Text>
      <Link href={`${currentPath}/skills`}>Skills</Link>
      <Link href={`${currentPath}/tasks`}>Tasks</Link>
    </Stack>
  );
}
