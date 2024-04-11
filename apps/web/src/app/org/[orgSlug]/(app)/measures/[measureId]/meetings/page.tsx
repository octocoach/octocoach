import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte, or } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

const LocalTime = dynamic(() => import("@octocoach/ui/LocalTime/LocalTime"), {
  ssr: false,
});

export default async function Page({
  params: { orgSlug, measureId },
}: {
  params: { orgSlug: string; measureId: string };
}) {
  const locale = getLocale();
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);

  const {
    meetingTable,
    meetingParticipantTable,
    measureTable,
    enrollmentTable,
  } = mkOrgSchema(orgSlug);

  const measure = await db
    .select({
      id: measureTable.id,
      owner: measureTable.owner,
      roomName: enrollmentTable.roomName,
    })
    .from(measureTable)
    .leftJoin(
      enrollmentTable,
      and(
        eq(enrollmentTable.measure, measureTable.id),
        or(
          eq(enrollmentTable.coachee, user.id),
          eq(enrollmentTable.coach, user.id)
        )
      )
    )
    .where(eq(measureTable.id, measureId))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  if (!measure.roomName) {
    return <Text>The enrollment is still pending approval</Text>;
  }

  const now = new Date();

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
        eq(meetingTable.measure, measure.id),
        gte(meetingTable.endTime, now)
      )
    )
    .orderBy(asc(meetingTable.startTime));

  const baseUrl = getBaseUrl();

  return (
    <Box paddingY="medium">
      <Stack spacing="loose">
        <Text size="l">
          <Message id="meetings.upcomingMeetings" />
        </Text>
        <Stack spacing="tight">
          {meetings.map((meeting) => (
            <ButtonLink
              key={meeting.id}
              Element={Link}
              href={`${baseUrl}measures/${measure.id}/meetings/${meeting.id}`}
              color="subtle"
            >
              <LocalTime
                timestamp={meeting.startTime}
                formatStr="PPPPpppp"
                locale={locale}
              />
            </ButtonLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
