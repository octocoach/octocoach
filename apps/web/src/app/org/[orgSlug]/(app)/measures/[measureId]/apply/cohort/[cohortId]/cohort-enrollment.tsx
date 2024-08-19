import { getBaseUrl } from "@helpers/navigation";
import { Session } from "@octocoach/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { Cohort } from "@octocoach/db/schemas/org/cohort";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { Box, Card, Stack, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";

import { MeasureWithInfoParam } from "../../../types";
import { createEnrollmentAction } from "../../actions";
import { EnrollmentApplication } from "../../enrollment-application";

export default async function CohortEnrollment({
  orgSlug,
  measure,
  user,
  locale,
  cohortId,
}: {
  orgSlug: Organization["slug"];
  measure: MeasureWithInfoParam;
  user: Session["user"];
  locale: Locales;
  cohortId: Cohort["id"];
}) {
  const baseUrl = getBaseUrl();
  const db = orgDb(orgSlug);
  const { cohortEnrollmentTable, cohortTable } = mkOrgSchema(orgSlug);

  const cohort = await db
    .select()
    .from(cohortTable)
    .where(
      and(eq(cohortTable.measure, measure.id), eq(cohortTable.id, cohortId))
    )
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

  return (
    <Box marginY="medium">
      <Card>
        <Stack justify="center">
          <Text size="l" variation="casual" textAlign="center">
            <Message id="apply.thankYou" />
          </Text>
          <Text textAlign="center">
            <Message
              id="apply.weWillBeInTouch"
              params={{ email: user.email }}
            />
          </Text>
        </Stack>
      </Card>
    </Box>
  );
}
