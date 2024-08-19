import type { Params } from "@app/org/[orgSlug]/types";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui/Stack/Stack";

import { createRoom } from "./actions";
import { EnrollmentRow } from "./row";

export default async function Page({ params: { orgSlug } }: Params) {
  const db = orgDb(orgSlug);
  const {
    individualEnrollmentTable,
    userTable,
    userProfileTable,
    measureTable,
    measureInfoTable,
  } = mkOrgSchema(orgSlug);

  const locale = getLocale();

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

  const createRoomWithSlug = createRoom.bind(null, orgSlug);

  return (
    <Stack>
      {individualEnrollments.map((enrollment) => (
        <EnrollmentRow
          key={`${enrollment.measure}.${enrollment.coachee}`}
          enrollment={enrollment}
          createRoom={createRoomWithSlug}
        />
      ))}
    </Stack>
  );
}
