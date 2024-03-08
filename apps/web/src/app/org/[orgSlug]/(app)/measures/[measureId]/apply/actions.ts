"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import {
  NewEnrollment,
  mkEnrollmentTable,
} from "@octocoach/db/schemas/org/enrollment";
import { revalidatePath } from "next/cache";

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
  const enrollmentTable = mkEnrollmentTable(orgSlug);

  await db.insert(enrollmentTable).values({ ...enrollment, coachee: user.id });

  revalidatePath("/org/[orgSlug]/(app)/measures/[measureId]/apply", "page");
};
