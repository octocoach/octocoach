import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { Params } from "../types";

const LocalTime = dynamic(() => import("@octocoach/ui/LocalTime/LocalTime"), {
  ssr: false,
});

export default async function Page({ params: { orgSlug, measureId } }: Params) {
  const locale = getLocale();
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);

  const { meetingTable, meetingParticipantTable } = mkOrgSchema(orgSlug);

  const now = new Date();

  const meetings = await db
    .select({
      id: meetingTable.id,
      startTime: meetingTable.startTime,
      endTime: meetingTable.endTime,
      role: meetingParticipantTable.role,
    })
    .from(meetingTable)
    .innerJoin(
      meetingParticipantTable,
      eq(meetingParticipantTable.meeting, meetingTable.id)
    )
    .where(
      and(
        eq(meetingTable.measure, measureId),
        gte(meetingTable.endTime, now),
        eq(meetingParticipantTable.user, user.id)
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
              href={`${baseUrl}measures/${measureId}/meetings/${meeting.id}`}
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
