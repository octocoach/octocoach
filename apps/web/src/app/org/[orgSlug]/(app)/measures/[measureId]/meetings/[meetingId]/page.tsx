import { Daily as DailyComponent } from "@components/daily/daily";
import { authOrRedirect } from "@helpers/auth";
import { Daily } from "@octocoach/daily";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Meeting } from "@octocoach/db/schemas/org/meeting";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Text } from "@octocoach/ui";
import { notFound } from "next/navigation";

export default async function Page({
  params: { orgSlug, meetingId },
}: {
  params: { orgSlug: string; meetingId: Meeting["id"] };
}) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const {
    meetingTable,
    meetingParticipantTable,
    enrollmentTable,
    userProfileTable,
  } = mkOrgSchema(orgSlug);

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
      eq(meetingTable.measure, enrollmentTable.measure)
    )
    .where(eq(meetingTable.id, meetingId))
    .then((rows) => {
      console.log(rows);
      return rows[0] ?? null;
    });

  if (!meeting) notFound();

  if (!meeting.roomName) return <Text>No room created</Text>;

  const userProfile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!userProfile) throw new Error("No user profile");

  const userName = `${userProfile.firstName} ${userProfile.lastName}`;

  const daily = new Daily();

  const isOwner = meeting.role === "coach";

  const token = await daily.createMeetingToken({
    autoStartTranscription: true,
    roomName: meeting.roomName,
    isOwner,
    userId: user.id,
    userName,
  });

  return (
    <DailyComponent
      roomName={meeting.roomName}
      token={token}
      isOwner={isOwner}
    />
  );
}
