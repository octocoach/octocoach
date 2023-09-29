import { orgDb } from "@octocoach/db/connection";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const db = orgDb(params.orgSlug);
  const members = await db.query.userTable.findMany({ with: {} });

  return (
    <Stack>
      {members.map((member) => (
        <Link href={`/org/${params.orgSlug}/coachees/${member.id}`}>
          <Text>{member.name}</Text>
        </Link>
      ))}
    </Stack>
  );
}
