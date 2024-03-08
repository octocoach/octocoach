import { orgDb } from "@octocoach/db/connection";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const db = orgDb(orgSlug);

  const { meetingTable } = mkOrgSchema(orgSlug);
  const meetings = await db.select().from(meetingTable);

  return <pre>{JSON.stringify(meetings, null, 2)}</pre>;
}
