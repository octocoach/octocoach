import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { EnrollmentRow } from "./row";
import { createRoom } from "./actions";

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const db = orgDb(orgSlug);
  const {
    enrollmentTable,
    userTable,
    userProfileTable,
    measureTable,
    measureInfoTable,
  } = mkOrgSchema(orgSlug);

  const locale = getLocale();

  const enrollments = await db
    .select({
      measure: enrollmentTable.measure,
      coachee: enrollmentTable.coachee,
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      title: measureInfoTable.title,
      status: enrollmentTable.status,
      startDate: enrollmentTable.startDate,
      roomName: enrollmentTable.roomName,
    })
    .from(enrollmentTable)
    .innerJoin(userTable, eq(enrollmentTable.coachee, userTable.id))
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .innerJoin(measureTable, eq(measureTable.id, enrollmentTable.measure))
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
      {enrollments.map((enrollment) => (
        <EnrollmentRow
          key={`${enrollment.measure}.${enrollment.coachee}`}
          enrollment={enrollment}
          createRoom={createRoomWithSlug}
        />
      ))}
    </Stack>
  );
}
