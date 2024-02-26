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
import { startOfDay } from "date-fns";

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

  const {
    meetingTable,
    meetingParticipantTable,
    measureInfoTable,
    coachTable,
    userTable,
    measureTable,
  } = mkOrgSchema(orgSlug);

  const measureInfo = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      slug: measureInfoTable.slug,
      coachId: coachTable.userId,
      coachName: userTable.name,
      coachImage: userTable.image,
    })
    .from(measureTable)
    .innerJoin(measureInfoTable, eq(measureTable.id, measureInfoTable.id))
    .innerJoin(coachTable, eq(coachTable.userId, measureTable.owner))
    .innerJoin(userTable, eq(userTable.id, coachTable.userId))
    .where(
      and(
        eq(measureInfoTable.slug, measureSlug),
        eq(measureInfoTable.locale, locale)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!measureInfo) notFound();

  const now = new Date();

  const coachMeetings = await db
    .select({
      start: meetingTable.startTime,
      end: meetingTable.endTime,
    })
    .from(meetingTable)
    .innerJoin(
      meetingParticipantTable,
      eq(meetingParticipantTable.meeting, meetingTable.id)
    )
    .where(
      and(
        eq(meetingParticipantTable.user, measureInfo.coachId),
        gte(meetingTable.startTime, startOfDay(now))
      )
    )
    .orderBy(asc(meetingTable.startTime));

  const meetings = await db
    .select({
      id: meetingTable.id,
      startTime: meetingTable.startTime,
      endTime: meetingTable.endTime,
      role: meetingParticipantTable.role,
    })
    .from(meetingTable)
    .leftJoin(
      meetingParticipantTable,
      eq(meetingParticipantTable.meeting, meetingTable.id)
    )
    .where(
      and(
        eq(meetingParticipantTable.user, user.id),
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
              {measureInfo.title}) - {meeting.role}
            </Link>
          </Box>
        ))}
      </Stack>
      <Box>
        {measureInfo.coachImage && (
          <img
            src={measureInfo.coachImage}
            alt="Coach"
            width={200}
            height={200}
            style={{ imageRendering: "pixelated" }}
          />
        )}
        <Text>{measureInfo.coachName}</Text>
      </Box>
      <Scheduler
        createMeeting={createMeetingWithSlug}
        measureId={measureInfo.id}
        coachId={measureInfo.coachId}
        coachMeetings={coachMeetings}
      />
    </Stack>
  );
}
