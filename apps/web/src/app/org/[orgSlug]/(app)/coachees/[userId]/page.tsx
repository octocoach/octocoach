import { getBaseUrl } from "@helpers/navigation";
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

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      <Text>{user.name}</Text>
      <Link href={`${baseUrl}coachees/${params.userId}/skills`}>Skills</Link>
      <Link href={`${baseUrl}coachees/${params.userId}/tasks`}>Tasks</Link>
    </Stack>
  );
}
