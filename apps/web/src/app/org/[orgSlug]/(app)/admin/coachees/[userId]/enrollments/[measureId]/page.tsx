import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box, Text } from "@octocoach/ui";

import Meetings from "./meetings";

export default async function Page({
  params: { orgSlug, userId, measureId },
}: {
  params: { orgSlug: string; userId: string; measureId: string };
}) {
  const locale = getLocale();

  const db = orgDb(orgSlug);
  const { individualEnrollmentTable, measureTable, measureInfoTable } =
    mkOrgSchema(orgSlug);

  const individualEnrollment = await db
    .select({
      status: individualEnrollmentTable.status,
      title: measureInfoTable.title,
      roomName: individualEnrollmentTable.roomName,
    })
    .from(individualEnrollmentTable)
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
    )
    .where(
      and(
        eq(individualEnrollmentTable.coachee, userId),
        eq(individualEnrollmentTable.measure, measureId)
      )
    )
    .then((rows) => getFirstRow(rows));

  return (
    <Box>
      <Text size="l">{individualEnrollment.title}</Text>
      <Text>Status: {individualEnrollment.status}</Text>
      {individualEnrollment.roomName && (
        <Meetings
          roomName={individualEnrollment.roomName}
          userId={userId}
          measureId={measureId}
        />
      )}
    </Box>
  );
}
