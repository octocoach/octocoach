"use server";

import { authOrRedirect } from "@helpers/auth";
import { getFreeBusy } from "@helpers/calendars/google";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, eq, gte, lt } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { NewEnrollment } from "@octocoach/db/schemas/org/enrollment";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Interval, addHours, endOfDay, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

export type CreateEnrollmentParams = Pick<
  NewEnrollment,
  "measure" | "screeningAnswers"
>;

export const createEnrollment = async (
  orgSlug: string,
  enrollment: CreateEnrollmentParams
) => {
  const db = orgDb(orgSlug);

  const { user } = await authOrRedirect(orgSlug);
  const { enrollmentTable, measureTable, userTable } = mkOrgSchema(orgSlug);

  const ownerEmail = await db
    .select({ email: userTable.email })
    .from(measureTable)
    .innerJoin(userTable, eq(userTable.id, measureTable.owner))
    .where(eq(measureTable.id, enrollment.measure))
    .then((rows) => rows[0]?.email ?? null);

  await db.insert(enrollmentTable).values({ ...enrollment, coachee: user.id });

  if (ownerEmail && user.email) {
    const key = process.env.RESEND_KEY;
    if (key) {
      const resend = new Resend(key);
      try {
        const { error } = await resend.emails.send({
          from: "OctoCoach <no-reply@notifications.octo.coach>",
          to: [ownerEmail],
          subject: "New Enrollment",
          text: `The user ${user.name} has applied for measure ${
            enrollment.measure
          }

          ${JSON.stringify(enrollment.screeningAnswers?.questions)}
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

  revalidatePath("/org/[orgSlug]/(app)/measures/[measureId]/apply", "page");
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
