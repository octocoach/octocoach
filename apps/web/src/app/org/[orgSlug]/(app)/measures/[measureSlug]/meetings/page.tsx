import Scheduler from "@components/scheduler";
import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box, Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMeeting } from "./actions";

const LocalTime = dynamic(() => import("@components/local-time"), {
  ssr: false,
});

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
        eq(meetingTable.measure, measureInfo.id),
        gte(meetingTable.endTime, new Date())
      )
    )
    .orderBy(asc(meetingTable.startTime));

  const createMeetingWithSlug = createMeeting.bind(null, orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <Stack spacing="loose">
      <Text size="xl" variation="casual">
        Scheduled Meetings
      </Text>
      <Stack spacing="tight">
        {meetings.map((meeting) => (
          <Box key={meeting.id}>
            <Link
              href={`${baseUrl}measures/${measureInfo.slug}/meetings/${meeting.id}`}
            >
              <LocalTime
                timestamp={meeting.startTime}
                formatStr="yyyy.MM.dd HH:mm"
              />{" "}
              - <LocalTime timestamp={meeting.endTime} formatStr="HH:mm" /> (
              {measureInfo.title})
            </Link>
          </Box>
        ))}
      </Stack>
      <Scheduler
        createMeeting={createMeetingWithSlug}
        measureInfo={measureInfo}
      />
    </Stack>
  );
}
