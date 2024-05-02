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
  const { enrollmentTable, measureTable, measureInfoTable } =
    mkOrgSchema(orgSlug);

  const enrollment = await db
    .select({
      status: enrollmentTable.status,
      title: measureInfoTable.title,
      roomName: enrollmentTable.roomName,
    })
    .from(enrollmentTable)
    .innerJoin(measureTable, eq(measureTable.id, enrollmentTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(
      and(
        eq(enrollmentTable.coachee, userId),
        eq(enrollmentTable.measure, measureId)
      )
    )
    .then((rows) => getFirstRow(rows));

  return (
    <Box>
      <Text size="l">{enrollment.title}</Text>
      <Text>Status: {enrollment.status}</Text>
      {enrollment.roomName && (
        <Meetings
          roomName={enrollment.roomName}
          userId={userId}
          measureId={measureId}
        />
      )}
    </Box>
  );
}
