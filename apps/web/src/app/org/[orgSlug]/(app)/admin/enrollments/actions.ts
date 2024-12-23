"use server";

import { authOrRedirect } from "@helpers/auth";
import { Daily } from "@octocoach/daily";
import { db as octoDb, orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { CohortEnrollment } from "@octocoach/db/schemas/org/cohort-enrollment";
import { IndividualEnrollment } from "@octocoach/db/schemas/org/individual-enrollment";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

import { EnrollmentTemplate } from "./email-templates";

export const createRoomAction = async (
  orgSlug: string,
  enrollment: Pick<IndividualEnrollment, "measure" | "coachee">
) => {
  const { user } = await authOrRedirect(orgSlug);
  const daily = new Daily();
  const roomName = daily.createRoomName();
  const db = orgDb(orgSlug);
  const {
    individualEnrollmentTable,
    measureTable,
    userProfileTable,
    userTable,
    measureInfoTable,
  } = mkOrgSchema(orgSlug);

  const measure = await db
    .select({
      owner: measureTable.owner,
      title: measureInfoTable.title,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureTable.id, measureInfoTable.id),
        eq(measureInfoTable.locale, "en")
      )
    )
    .where(eq(measureTable.id, enrollment.measure))
    .then((rows) => rows[0] ?? null);

  if (!measure) {
    throw new Error("Measure not found");
  }

  if (user.id !== measure.owner) {
    throw new Error("User is not the owner of the measure");
  }

  const room = await daily.createRoom({
    privacy: "private",
    name: roomName,
    autoTranscription: true,
  });

  await db
    .update(individualEnrollmentTable)
    .set({ roomName: room.name, coach: user.id })
    .where(
      and(
        eq(individualEnrollmentTable.measure, enrollment.measure),
        eq(individualEnrollmentTable.coachee, enrollment.coachee)
      )
    );

  const key = process.env.RESEND_KEY;
  if (key) {
    const organization = await octoDb
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.slug, orgSlug))
      .then((rows) => rows[0] ?? null);

    if (!organization) throw new Error(`Can't find organization ${orgSlug}`);

    const coachee = await db
      .select({
        email: userTable.email,
        firstName: userProfileTable.firstName,
      })
      .from(userTable)
      .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
      .where(eq(userTable.id, enrollment.coachee))
      .then((rows) => rows[0] ?? null);

    if (!coachee) throw new Error(`Can't find coachee ${enrollment.coachee}`);

    try {
      const resend = new Resend(key);
      const { error } = await resend.emails.send({
        from: `${organization.displayName} <no-reply@notifications.octo.coach>`,
        to: [coachee.email],
        subject: `Your application for ${measure.title}`,
        react: EnrollmentTemplate({
          firstName: coachee.firstName,
          coachName: user.name || "Coach",
          measureTitle: measure.title,
          measureId: enrollment.measure,
          domain: organization.domain,
          orgSlug,
        }),
      });
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Missing RESEND_KEY");
  }

  return room;
};

export const setCohortEnrollmentStatusAction = async (
  orgSlug: string,
  enrollment: Pick<CohortEnrollment, "user" | "cohort">,
  status: CohortEnrollment["status"]
) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) throw new Error("User is not a coach");

  const db = orgDb(orgSlug);

  const { cohortEnrollmentTable } = mkOrgSchema(orgSlug);

  await db
    .update(cohortEnrollmentTable)
    .set({ status })
    .where(
      and(
        eq(cohortEnrollmentTable.user, enrollment.user),
        eq(cohortEnrollmentTable.cohort, enrollment.cohort)
      )
    );

  revalidatePath(`/org/${orgSlug}/admin/enrollments`);
};
