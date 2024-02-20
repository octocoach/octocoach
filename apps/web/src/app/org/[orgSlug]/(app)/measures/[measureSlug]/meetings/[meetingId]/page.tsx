import { Daily as DailyComponent } from "@components/daily/daily";
import { authOrRedirect } from "@helpers/auth";
import { Daily } from "@octocoach/daily";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Meeting } from "@octocoach/db/schemas/org/meeting";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { formatDistance, formatRelative, isFuture } from "date-fns";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Time } from "./client";

export default async function Page({
  params: { orgSlug, meetingId },
}: {
  params: { orgSlug: string; meetingId: Meeting["id"] };
}) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const { meetingTable, enrollmentTable } = mkOrgSchema(orgSlug);

  const meeting = await db
    .select()
    .from(meetingTable)
    .innerJoin(
      enrollmentTable,
      and(
        eq(meetingTable.measure, enrollmentTable.measure),
        eq(meetingTable.coachee, enrollmentTable.coachee)
      )
    )
    .where(eq(meetingTable.id, meetingId))
    .then((rows) => rows[0] ?? null);

  if (!meeting.enrollment.roomName) return <Text>No room created</Text>;

  const daily = new Daily();

  const token = await daily.createMeetingToken({
    room_name: meeting.enrollment.roomName,
    is_owner: !!user.isCoach,
  });

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Europe/Berlin");

  return (
    <Stack>
      <DailyComponent roomName={meeting.enrollment.roomName} token={token} />
      <Text>
        Server: {`${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
      </Text>
      <Time />
      <Text>{formatRelative(meeting.meeting.startTime, new Date())}</Text>
      <Text>
        {isFuture(meeting.meeting.startTime) ? "Staring in " : "Started "}
        {formatDistance(meeting.meeting.startTime, new Date())}
      </Text>
      <pre>{JSON.stringify(meeting.meeting, null, 2)}</pre>
    </Stack>
  );
}
