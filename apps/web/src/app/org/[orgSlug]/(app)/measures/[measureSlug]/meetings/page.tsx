import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { AddMeeting } from "./add";
import { notFound } from "next/navigation";
import { createMeeting } from "./actions";
import { Box } from "@octocoach/ui";
import Link from "next/link";
import { getBaseUrl } from "@helpers/navigation";

export default async function Page({
  params: { orgSlug, measureSlug },
}: {
  params: { orgSlug: string; measureSlug: string };
}) {
  const locale = getLocale();
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);

  const { meetingTable, measureInfoTable } = mkOrgSchema(orgSlug);

  const measureInfo = await db
    .select()
    .from(measureInfoTable)
    .where(
      and(
        eq(measureInfoTable.slug, measureSlug),
        eq(measureInfoTable.locale, locale)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!measureInfo) notFound();

  const meetings = await db
    .select()
    .from(meetingTable)
    .where(
      and(
        eq(meetingTable.coachee, user.id),
        eq(meetingTable.measure, measureInfo.id)
      )
    );

  const createMeetingWithSlug = createMeeting.bind(null, orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      {meetings.map((meeting) => (
        <Box key={meeting.id}>
          <Link
            href={`${baseUrl}measures/${measureInfo.slug}/meetings/${meeting.id}`}
          >
            {measureInfo.title}
          </Link>
        </Box>
      ))}
      <AddMeeting
        measureInfo={measureInfo}
        createMeeting={createMeetingWithSlug}
      />
    </Stack>
  );
}
