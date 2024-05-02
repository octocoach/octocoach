import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, sql } from "@octocoach/db/operators";
import { Enrollment } from "@octocoach/db/schemas/org/enrollment";
import { MeasureInfo } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui";
import { Text } from "@octocoach/ui/Text/Text";
import Link from "next/link";

type CoacheeEnrollment = {
  measure: MeasureInfo["title"];
  status: Enrollment["status"];
};

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const locale = getLocale();

  const db = orgDb(orgSlug);
  const {
    enrollmentTable,
    measureTable,
    measureInfoTable,
    userTable,
    userProfileTable,
  } = mkOrgSchema(orgSlug);
  const coachees = await db
    .select({
      id: userTable.id,
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
      enrollments: sql<CoacheeEnrollment[]>`
        json_agg(
          json_build_object(
            'measure', ${measureInfoTable.title},
            'status', ${enrollmentTable.status}
          )
        )`,
    })
    .from(userTable)
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .innerJoin(enrollmentTable, eq(enrollmentTable.coachee, userTable.id))
    .innerJoin(measureTable, eq(measureTable.id, enrollmentTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .groupBy((table) => [table.id, table.firstName, table.lastName]);

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      {coachees.map(({ firstName, lastName, id, enrollments }) => (
        <Stack key={id} direction="horizontal">
          <Link href={`${baseUrl}admin/coachees/${id}`}>
            <Text>
              {firstName} {lastName}
            </Text>
          </Link>
          <Stack>
            {enrollments.map(({ measure, status }) => (
              <Text key={measure}>
                {measure} ({status})
              </Text>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
