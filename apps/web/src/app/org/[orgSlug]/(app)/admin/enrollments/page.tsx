import type { Params } from "@app/org/[orgSlug]/types";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";

import { createRoomAction, setCohortEnrollmentStatusAction } from "./actions";
import { CohortEnrollmentRow } from "./cohort-row";
import { IndividualEnrollmentRow } from "./individual-row";

export type CohortEnrollment = Awaited<
  ReturnType<typeof getCohortEnrollments>
>[0];

export type IndividualEnrollment = Awaited<
  ReturnType<typeof getIndividualEnrollments>
>[0];

const getIndividualEnrollments = async (orgSlug: string, locale: Locales) => {
  const db = orgDb(orgSlug);

  const {
    userProfileTable,
    userTable,
    individualEnrollmentTable,
    measureTable,
    measureInfoTable,
  } = mkOrgSchema(orgSlug);

  const individualEnrollments = await db
    .select({
      measure: individualEnrollmentTable.measure,
      coachee: individualEnrollmentTable.coachee,
      screeningAnswers: individualEnrollmentTable.screeningAnswers,
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      title: measureInfoTable.title,
      status: individualEnrollmentTable.status,
      startDate: individualEnrollmentTable.startDate,
      roomName: individualEnrollmentTable.roomName,
    })
    .from(individualEnrollmentTable)
    .innerJoin(userTable, eq(individualEnrollmentTable.coachee, userTable.id))
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .innerJoin(
      measureTable,
      eq(measureTable.id, individualEnrollmentTable.measure)
    )
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    );

  return individualEnrollments;
};

const getCohortEnrollments = async (orgSlug: string, locale: Locales) => {
  const db = orgDb(orgSlug);

  const {
    userProfileTable,
    userTable,
    cohortEnrollmentTable,
    cohortTable,
    measureTable,
    measureInfoTable,
  } = mkOrgSchema(orgSlug);

  const cohortEnrollments = await db
    .select({
      cohort: cohortTable.id,
      title: measureInfoTable.title,
      status: cohortEnrollmentTable.status,
      startDate: cohortTable.startDate,
      user: cohortEnrollmentTable.user,
      email: userTable.email,
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      screeningAnswers: cohortEnrollmentTable.screeningAnswers,
    })
    .from(cohortEnrollmentTable)
    .innerJoin(userTable, eq(userTable.id, cohortEnrollmentTable.user))
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .innerJoin(cohortTable, eq(cohortTable.id, cohortEnrollmentTable.cohort))
    .innerJoin(measureTable, eq(measureTable.id, cohortTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    );

  return cohortEnrollments;
};

export default async function Page({ params: { orgSlug } }: Params) {
  const locale = getLocale();

  const individualEnrollments = await getIndividualEnrollments(orgSlug, locale);
  const cohortEnrollments = await getCohortEnrollments(orgSlug, locale);

  return (
    <Stack>
      <Stack>
        <Text size="l">Individual Enrollments</Text>
        {individualEnrollments.map((enrollment) => (
          <IndividualEnrollmentRow
            key={`${enrollment.measure}.${enrollment.coachee}`}
            enrollment={enrollment}
            createRoom={createRoomAction.bind(null, orgSlug)}
          />
        ))}
      </Stack>
      <Stack>
        <Text size="l">Cohort Enrollments</Text>
        {cohortEnrollments.map((enrollment) => (
          <CohortEnrollmentRow
            key={`${enrollment.cohort}.${enrollment.user}`}
            enrollment={enrollment}
            setCohortEnrollmentStatusAction={setCohortEnrollmentStatusAction.bind(
              null,
              orgSlug
            )}
          />
        ))}
      </Stack>
    </Stack>
  );
}
