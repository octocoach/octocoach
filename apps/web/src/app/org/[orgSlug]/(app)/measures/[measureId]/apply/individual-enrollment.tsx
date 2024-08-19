import { FillImage } from "@components/fill-image";
import { getBaseUrl, orgRedirect } from "@helpers/navigation";
import { Session } from "@octocoach/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, gte } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Card, Grid, Scheduler, Stack } from "@octocoach/ui";
import { Text } from "@octocoach/ui";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { createMeeting } from "../../actions";
import { createEnrollmentAction, getBusyIntervals } from "./actions";
import { EnrollmentApplication } from "./enrollment-application";
import { JoinButton } from "./join-button";
import { MeasureWithInfoParam } from "./page";

const LocalTime = dynamic(() => import("@octocoach/ui/LocalTime/LocalTime"), {
  ssr: false,
});

export default async function IndividualEnrollment({
  orgSlug,
  measure,
  user,
  locale,
}: {
  orgSlug: string;
  measure: MeasureWithInfoParam;
  user: Session["user"];
  locale: Locales;
}) {
  const baseUrl = getBaseUrl();
  const db = orgDb(orgSlug);

  const {
    userTable,
    coachTable,
    individualEnrollmentTable,
    meetingTable,
    meetingParticipantTable,
    moduleTable,
    moduleInfoTable,
    measureTable,
    measureModuleTable,
  } = mkOrgSchema(orgSlug);

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

  const individualEnrollment = await db
    .select()
    .from(individualEnrollmentTable)
    .where(
      and(
        eq(individualEnrollmentTable.measure, measure.id),
        eq(individualEnrollmentTable.coachee, user.id)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!individualEnrollment)
    return (
      <Box marginY="medium">
        <EnrollmentApplication
          measure={measure}
          locale={locale}
          createEnrollmentAction={createEnrollmentAction.bind(null, orgSlug)}
          measureUrl={`${baseUrl}measures/${measure.id}`}
        />
      </Box>
    );

  if (individualEnrollment.status === "active")
    orgRedirect(`measures/${measure.id}/meetings`);

  if (individualEnrollment.status === "pending") {
    if (individualEnrollment.roomName) {
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
              <Stack justify="center" spacing="tight">
                <Text size="l" weight="light">
                  📅{" "}
                  <LocalTime
                    timestamp={existingMeeting.startTime}
                    formatStr={"PPPP"}
                    locale={locale}
                  />
                </Text>
                <Text size="l" weight="light">
                  ⏰{" "}
                  <LocalTime
                    timestamp={existingMeeting.startTime}
                    formatStr="HH:mm"
                    locale={locale}
                  />
                </Text>
              </Stack>
              <JoinButton
                baseUrl={baseUrl}
                measureId={measure.id}
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
        <Stack justify="center">
          <Text size="l" weight="light" element="span">
            <Text element="span" weight="heavy" variation="casual" size="l">
              <Message id="apply.fantasticNews" />
            </Text>{" "}
            <Message id="apply.almostThere" />
          </Text>
          <Text>
            <Message
              id="apply.provisionallyApproved"
              params={{ measureTitle: measure.title }}
            />
          </Text>
          <Text>
            <Message id="apply.letsDiscuss" />
          </Text>
          <Scheduler
            locale={locale}
            createMeeting={createMeetingWithSlug}
            measureId={measure.id}
            coach={coach}
            meetingType="consultation"
            getBusyIntervals={boundGetBusyIntervals}
          />
          <Text>
            <Message id="apply.noTime" />
          </Text>
          <Text>
            <Message id="apply.lookingForward" />
          </Text>
        </Stack>
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
        .where(eq(measureTable.id, measure.id));

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
                  <Message id="apply.thankYou" />
                </Text>
                <Text textAlign="center">
                  {user && (
                    <Message
                      id="apply.weWillBeInTouch"
                      params={{ email: user.email }}
                    />
                  )}
                </Text>
              </Stack>
              {hasLinks && (
                <Stack>
                  <Text size="l" weight="light" variation="casual">
                    <Message id="apply.whileWaiting" />
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
