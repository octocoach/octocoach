import LocalTime from "@components/local-time";
import Scheduler from "@components/scheduler";
import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box, Card, Stack, Text } from "@octocoach/ui";
import { startOfDay } from "date-fns";
import { notFound } from "next/navigation";
import { createMeeting } from "../../actions";
import { createEnrollment } from "./actions";
import { EnrollmentApplication } from "./enrollment-application";

export default async function Page({
  params: { orgSlug, measureId },
}: {
  params: { orgSlug: string; measureId: string };
}) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const locale = getLocale();

  const {
    userProfileTable,
    measureTable,
    measureInfoTable,
    enrollmentTable,
    meetingTable,
    meetingParticipantTable,
    userTable,
  } = mkOrgSchema(orgSlug);

  const profile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    const search = new URLSearchParams();
    search.set("origin", `/measures/${measureId}/apply`);
    orgRedirect(`signup?${search}`);
  }

  const measure = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      screeningQuestions: measureInfoTable.screeningQuestions,
      owner: measureTable.owner,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(measureTable.id, measureId))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  const enrollment = await db
    .select()
    .from(enrollmentTable)
    .where(
      and(
        eq(enrollmentTable.measure, measure.id),
        eq(enrollmentTable.coachee, user.id)
      )
    )
    .then((rows) => rows[0] ?? null);

  const createEnrollmentWithSlug = createEnrollment.bind(null, orgSlug);

  if (!enrollment)
    return (
      <Box marginY="medium">
        <EnrollmentApplication
          measure={measure}
          locale={locale}
          createEnrollment={createEnrollmentWithSlug}
        />
      </Box>
    );

  if (enrollment.status === "active")
    orgRedirect(`measures/${measureId}/meetings`);

  if (enrollment.status === "pending") {
    if (enrollment.roomName) {
      const now = new Date();

      const existingMeeting = await db
        .select({
          startTime: meetingTable.startTime,
          coach: userTable.name,
        })
        .from(meetingTable)
        .innerJoin(
          meetingParticipantTable,
          eq(meetingTable.id, meetingParticipantTable.meeting)
        )
        .innerJoin(userTable, eq(userTable.id, measure.owner))
        .where(
          and(
            gte(meetingTable.startTime, now),
            eq(meetingParticipantTable.user, user.id),
            eq(meetingTable.type, "consultation")
          )
        )
        .then((rows) => rows[0] ?? null);

      if (existingMeeting) {
        return (
          <Card>
            <Text textAlign="center" size="l" variation="casual">
              Your consultation meeting with {existingMeeting.coach} is
              scheduled for
            </Text>
            <Text size="xl" textAlign="center" weight="light">
              <LocalTime timestamp={existingMeeting.startTime} />
            </Text>
          </Card>
        );
      }

      const createMeetingWithSlug = createMeeting.bind(null, orgSlug);

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
            eq(meetingParticipantTable.user, measure.owner),
            gte(meetingTable.startTime, startOfDay(now))
          )
        )
        .orderBy(asc(meetingTable.startTime));

      return (
        <Scheduler
          createMeeting={createMeetingWithSlug}
          measureId={measureId}
          coachId={measure.owner}
          coachMeetings={coachMeetings}
          meetingType="consultation"
        />
      );
    } else {
      return (
        <Box marginY="medium">
          <Card>
            <Stack justify="center">
              <Text
                size="l"
                variation="casual"
                weight="bold"
                textAlign="center"
              >
                Thank you for application!
              </Text>
              <Text textAlign="center">We will be in touch shortly...</Text>
              <Text size="s" textAlign="center">
                If {user.email} is not your active address, please contact us at{" "}
                <a href="mailto:hello@q15.co">hello@q15.co</a>
              </Text>
            </Stack>
          </Card>
        </Box>
      );
    }
  }
}
