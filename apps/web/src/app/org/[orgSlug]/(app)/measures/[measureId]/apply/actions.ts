"use server";

import { authOrRedirect } from "@helpers/auth";
import { getFreeBusy } from "@helpers/calendars/google";
import { sendFacebookConversionEvent } from "@helpers/facebook";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte, lt } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { NewCohortEnrollment } from "@octocoach/db/schemas/org/cohort-enrollment";
import { NewIndividualEnrollment } from "@octocoach/db/schemas/org/individual-enrollment";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { exhaustiveCheck } from "@octocoach/tshelpers";
import { addHours, endOfDay, formatDate, Interval, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { stringify } from "yaml";

export type CreateEnrollmentActionParams =
  | {
      type: "individual";
      enrollment: CreateIndividualEnrollmentParams;
    }
  | {
      type: "cohort";
      enrollment: CreateCohortEnrollmentParams;
    };

export type CreateIndividualEnrollmentParams = Pick<
  NewIndividualEnrollment,
  "measure" | "screeningAnswers"
>;

export type CreateCohortEnrollmentParams = Omit<NewCohortEnrollment, "user">;

export const createEnrollmentAction = async (
  orgSlug: string,
  { type, enrollment }: CreateEnrollmentActionParams
) => {
  switch (type) {
    case "individual":
      return await createIndividualEnrollment(orgSlug, { enrollment });
    case "cohort":
      return await createCohortEnrollment(orgSlug, { enrollment });
    default:
      return exhaustiveCheck(type);
  }
};

const createIndividualEnrollment = async (
  orgSlug: string,
  { enrollment }: { enrollment: CreateIndividualEnrollmentParams }
) => {
  const db = orgDb(orgSlug);

  const { user } = await authOrRedirect(orgSlug);
  const {
    individualEnrollmentTable,
    measureTable,
    userTable,
    userProfileTable,
  } = mkOrgSchema(orgSlug);

  const ownerEmail = await db
    .select({ email: userTable.email })
    .from(measureTable)
    .innerJoin(userTable, eq(userTable.id, measureTable.owner))
    .where(eq(measureTable.id, enrollment.measure))
    .then((rows) => rows[0]?.email ?? null);

  await db
    .insert(individualEnrollmentTable)
    .values({ ...enrollment, coachee: user.id });

  const userProfile = await db
    .select({
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      email: userTable.email,
      city: userProfileTable.city,
    })
    .from(userTable)
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .where(eq(userTable.id, user.id))
    .then((rows) => rows[0] ?? null);

  if (!userProfile) throw new Error(`Can't find user ${user.id}`);

  if (ownerEmail && userProfile.firstName && userProfile.lastName) {
    const key = process.env.RESEND_KEY;
    if (key) {
      const resend = new Resend(key);
      try {
        const { error } = await resend.emails.send({
          from: "OctoCoach <no-reply@notifications.octo.coach>",
          to: [ownerEmail],
          subject: "New Enrollment",
          text: `The user ${userProfile.firstName} ${
            userProfile.lastName
          } has applied for measure ${enrollment.measure}

          ${stringify(enrollment.screeningAnswers?.questions)}
          `,
        });

        if (error) console.error(error);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("No resend API Key!");
    }
  }

  await sendFacebookConversionEvent({
    eventName: "SubmitApplication",
    user: userProfile,
  });

  revalidatePath("/org/[orgSlug]/(app)/measures/[measureId]/apply", "page");
};

const createCohortEnrollment = async (
  orgSlug: string,
  { enrollment }: { enrollment: CreateCohortEnrollmentParams }
) => {
  const { user } = await authOrRedirect(orgSlug);

  const key = process.env.RESEND_KEY;
  if (!key) throw new Error("Missing RESEND_KEY");

  const db = orgDb(orgSlug);
  const {
    cohortEnrollmentTable,
    cohortTable,
    measureInfoTable,
    measureTable,
    userProfileTable,
    userTable,
  } = mkOrgSchema(orgSlug);

  const ownerEmail = await db
    .select({ email: userTable.email })
    .from(cohortTable)
    .innerJoin(measureTable, eq(measureTable.id, cohortTable.measure))
    .innerJoin(userTable, eq(userTable.id, measureTable.owner))
    .where(eq(cohortTable.id, enrollment.cohort))
    .then((rows) => rows[0]?.email ?? null);

  if (!ownerEmail)
    throw new Error(`Can't find owner email for cohort ${enrollment.cohort}`);

  const userProfile = await db
    .select({
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      email: userTable.email,
      city: userProfileTable.city,
    })
    .from(userTable)
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .where(eq(userTable.id, user.id))
    .then((rows) => rows[0] ?? null);

  if (!userProfile) throw new Error(`Can't find user ${user.id}`);

  const locale = getLocale();

  const measure = await db
    .select({ title: measureInfoTable.title, startDate: cohortTable.startDate })
    .from(cohortTable)
    .innerJoin(measureTable, eq(measureTable.id, cohortTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(cohortTable.id, enrollment.cohort))
    .then((rows) => rows[0] ?? null);

  if (!measure)
    throw new Error(`Can't find measure for cohort ${enrollment.cohort}`);

  await db
    .insert(cohortEnrollmentTable)
    .values({ ...enrollment, user: user.id });

  const resend = new Resend(key);

  try {
    const { error } = await resend.emails.send({
      from: "OctoCoach <no-reply@notifications.octo.coach>",
      to: [ownerEmail],
      subject: "New Cohort Enrollment",
      text: `The user ${userProfile.firstName} ${
        userProfile.lastName
      } has applied for ${measure.title} starting on ${formatDate(
        measure.startDate,
        "dd.MM.yy"
      )}.
      
      Screening Answers:

      ${stringify(enrollment.screeningAnswers?.questions)}
      `,
    });
    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }

  await sendFacebookConversionEvent({
    eventName: "SubmitApplication",
    user: userProfile,
  });

  revalidatePath(
    "/org/[orgSlug]/(app)/measures/[measureId]/apply/cohort/[cohortId]",
    "page"
  );
};

export const getBusyIntervals = async (
  {
    orgSlug,
    coachId,
  }: {
    orgSlug: Organization["slug"];
    coachId: string;
  },
  date: Date
): Promise<Interval[]> => {
  const db = orgDb(orgSlug);

  const { meetingTable, meetingParticipantTable } = mkOrgSchema(orgSlug);

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
        eq(meetingParticipantTable.user, coachId),
        gte(meetingTable.startTime, startOfDay(date)),
        lt(meetingTable.startTime, endOfDay(date))
      )
    )
    .orderBy(asc(meetingTable.startTime));

  const googleBusy = await getFreeBusy({
    userId: coachId,
    orgSlug,
    start: date,
    end: addHours(date, 24),
  });

  return [...coachMeetings, ...googleBusy];
};
