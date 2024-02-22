import { Daily as DailyComponent } from "@components/daily/daily";
import { authOrRedirect } from "@helpers/auth";
import { Daily } from "@octocoach/daily";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Meeting } from "@octocoach/db/schemas/org/meeting";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { formatDistanceToNow } from "date-fns";
import dynamic from "next/dynamic";

const LocalTime = dynamic(() => import("@components/local-time"), {
  ssr: false,
});

export default async function Page({
  params: { orgSlug, meetingId },
}: {
  params: { orgSlug: string; meetingId: Meeting["id"] };
}) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const { meetingTable, meetingParticipantTable, enrollmentTable } =
    mkOrgSchema(orgSlug);

  const meeting = await db
    .select({
      roomName: enrollmentTable.roomName,
      startTime: meetingTable.startTime,
      endTime: meetingTable.endTime,
      role: meetingParticipantTable.role,
    })
    .from(meetingTable)
    .innerJoin(
      meetingParticipantTable,
      and(
        eq(meetingParticipantTable.meeting, meetingTable.id),
        eq(meetingParticipantTable.user, user.id)
      )
    )
    .innerJoin(
      enrollmentTable,
      and(eq(meetingTable.measure, enrollmentTable.measure))
    )
    .where(eq(meetingTable.id, meetingId))
    .then((rows) => rows[0] ?? null);

  if (!meeting.roomName) return <Text>No room created</Text>;

  const daily = new Daily();

  const token = await daily.createMeetingToken({
    room_name: meeting.roomName,
    is_owner: meeting.role === "coach",
  });

  return (
    <Stack>
      <DailyComponent roomName={meeting.roomName} token={token} />
      <LocalTime timestamp={meeting.startTime} showTimezone />
      <Text>{formatDistanceToNow(meeting.startTime)}</Text>
    </Stack>
  );
}
