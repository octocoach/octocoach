import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkEnrollmentTable } from "@octocoach/db/schemas/org/enrollment";
import { Measure } from "@octocoach/db/schemas/org/measure";

export const createEnrollment = async (
  orgSlug: string,
  measureId: Measure["id"]
) => {
  const db = orgDb(orgSlug);

  const enrollmentTable = mkEnrollmentTable(orgSlug);
  const { user } = await authOrRedirect(orgSlug);

  let enrollment = await db
    .select()
    .from(enrollmentTable)
    .where(
      and(
        eq(enrollmentTable.measure, measureId),
        eq(enrollmentTable.coachee, user.id)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (enrollment) return enrollment;

  enrollment = await db
    .insert(enrollmentTable)
    .values({ measure: measureId, coachee: user.id })
    .returning()
    .then((rows) => rows[0]);

  return enrollment;
};
