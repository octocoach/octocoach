import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box } from "@octocoach/ui";
import { notFound } from "next/navigation";

import { createEnrollmentAction } from "./actions";
import { EnrollmentApplication } from "./enrollment-application";
import { EnrollmentComponentProps } from "./types";

export default async function CohortEnrollment({
  orgSlug,
  measure,
  user,
  locale,
}: EnrollmentComponentProps) {
  const baseUrl = getBaseUrl();
  const db = orgDb(orgSlug);
  const { cohortEnrollmentTable, cohortTable } = mkOrgSchema(orgSlug);

  const cohort = await db
    .select()
    .from(cohortTable)
    .where(and(eq(cohortTable.measure, measure.id)))
    .then((rows) => rows[0] ?? null);

  if (!cohort) return notFound();

  const cohortEnrollment = await db
    .select()
    .from(cohortEnrollmentTable)
    .where(
      and(
        eq(cohortEnrollmentTable.user, user.id),
        eq(cohortEnrollmentTable.cohort, cohort.id)
      )
    )

    .then((rows) => rows[0] ?? null);

  if (!cohortEnrollment)
    return (
      <Box marginY="medium">
        <EnrollmentApplication
          measure={measure}
          cohortId={cohort.id}
          locale={locale}
          createEnrollmentAction={createEnrollmentAction.bind(null, orgSlug)}
          measureUrl={`${baseUrl}measures/${measure.id}`}
        />
      </Box>
    );

  return <pre>{JSON.stringify(cohortEnrollment, null, 2)}</pre>;
}
