import { FillImage } from "@components/fill-image";
import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl, orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, gte } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Scheduler, Text } from "@octocoach/ui";
import { Card } from "@octocoach/ui/Card/Card";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Stack } from "@octocoach/ui/Stack/Stack";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createMeeting } from "../../actions";
import { createEnrollment, getBusyIntervals } from "./actions";
import { EnrollmentApplication } from "./enrollment-application";
import { JoinButton } from "./join-button";

const LocalTime = dynamic(() => import("@octocoach/ui/LocalTime/LocalTime"), {
  ssr: false,
});

export default async function Page({
  params: { orgSlug, measureId },
}: {
  params: { orgSlug: string; measureId: string };
}) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const locale = getLocale();
  const baseUrl = getBaseUrl();

  const {
    userProfileTable,
    measureTable,
    measureInfoTable,
    measureModuleTable,
    moduleTable,
    moduleInfoTable,
    enrollmentTable,
    meetingTable,
    meetingParticipantTable,
    userTable,
    coachTable,
  } = mkOrgSchema(orgSlug);

  const profile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    const search = new URLSearchParams();
    search.set("origin", `/measures/${measureId}/apply`);
    orgRedirect(`signup?${search.toString()}`);
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

  const coach = await db
    .select({
      id: userTable.id,
      name: userTable.name,
      image: userTable.image,
      hoursBuffer: coachTable.hoursBuffer,
      availability: coachTable.availability,
    })
    .from(userTable)
    .innerJoin(coachTable, eq(coachTable.userId, userTable.id))
    .where(eq(userTable.id, measure.owner))
    .then((rows) => rows[0] ?? null);

  if (!coach) throw new Error("Coach not found");

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
          measureUrl={`${baseUrl}measures/${measureId}`}
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
          id: meetingTable.id,
          startTime: meetingTable.startTime,
          coach: userTable.name,
          coachImage: userTable.image,
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
            <Stack align="center">
              {existingMeeting.coachImage && (
                <Image
                  src={existingMeeting.coachImage}
                  alt={existingMeeting.coach || "coach"}
                  width={200}
                  height={200}
                  style={{ imageRendering: "pixelated" }}
                />
              )}
              <Text textAlign="center" size="l" variation="casual">
                <Message
                  id="meetings.booked"
                  params={{ name: existingMeeting.coach }}
                />
              </Text>
              <Text size="xl" textAlign="center" weight="light">
                <LocalTime
                  timestamp={existingMeeting.startTime}
                  formatStr={`PPPP '${locale === "de" ? "um" : "at"}' HH:mm`}
                  locale={locale}
                />
              </Text>
              <JoinButton
                baseUrl={baseUrl}
                measureId={measureId}
                meetingId={existingMeeting.id}
                startTime={existingMeeting.startTime}
                locale={locale}
              />
            </Stack>
          </Card>
        );
      }

      const createMeetingWithSlug = createMeeting.bind(null, orgSlug);

      const boundGetBusyIntervals = getBusyIntervals.bind(null, {
        orgSlug,
        coachId: measure.owner,
      });

      return (
        <Scheduler
          locale={locale}
          createMeeting={createMeetingWithSlug}
          measureId={measureId}
          coach={coach}
          meetingType="consultation"
          getBusyIntervals={boundGetBusyIntervals}
        />
      );
    } else {
      const moduleInfo = await db
        .select({
          title: moduleInfoTable.title,
          imgSrc: moduleTable.imageSrc,
          imgAlt: moduleInfoTable.imageAlt,
          content: moduleInfoTable.content,
        })
        .from(measureTable)
        .innerJoin(
          measureModuleTable,
          eq(measureModuleTable.measure, measure.id)
        )
        .innerJoin(moduleTable, eq(moduleTable.id, measureModuleTable.module))
        .innerJoin(
          moduleInfoTable,
          and(
            eq(moduleInfoTable.id, moduleTable.id),
            eq(moduleInfoTable.locale, locale)
          )
        )
        .where(eq(measureTable.id, measureId));

      const hasLinks = moduleInfo.some(({ content }) => content?.links.length);

      return (
        <Box marginY="medium">
          <Card>
            <Stack spacing="loose">
              <Stack justify="center">
                <Text
                  size="l"
                  variation="casual"
                  weight="bold"
                  textAlign="center"
                >
                  <Message id={"measure.application.thankYou"} />
                </Text>
                <Text textAlign="center">
                  <Message
                    id="measure.application.weWillBeInTouch"
                    params={{ email: user.email }}
                  />
                </Text>
              </Stack>
              {hasLinks && (
                <Stack>
                  <Text size="l" weight="light" variation="casual">
                    <Message id="measure.application.whileWaiting" />
                  </Text>
                  <Stack>
                    {moduleInfo?.map((info, key) =>
                      info.content?.links.length ? (
                        <Grid columns="auto" gap="large" key={key}>
                          <FillImage
                            src={info.imgSrc}
                            alt={info.imgAlt}
                            minHeight={100}
                            roundedCorners
                          />
                          <Box>
                            <Text weight="heavy" variation="casual">
                              {info.title}
                            </Text>
                            {info.content?.links && (
                              <Stack spacing="tight">
                                {info.content.links.map((link, key) => (
                                  <Card surface="mantle" key={key}>
                                    <Stack
                                      direction="horizontal"
                                      wrap
                                      align="center"
                                    >
                                      <ButtonLink
                                        Element={Link}
                                        href={`${baseUrl}${link.url}`}
                                        text={link.title}
                                      />
                                      <Text>{link.description}</Text>
                                    </Stack>
                                  </Card>
                                ))}
                              </Stack>
                            )}
                          </Box>
                        </Grid>
                      ) : null
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Card>
        </Box>
      );
    }
  }
}
