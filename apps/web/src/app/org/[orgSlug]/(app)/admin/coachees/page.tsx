import type { Params } from "@app/org/[orgSlug]/types";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, sql } from "@octocoach/db/operators";
import { IndividualEnrollment } from "@octocoach/db/schemas/org/individual-enrollment";
import { MeasureInfo } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui";
import { Text } from "@octocoach/ui/Text/Text";
import Link from "next/link";

type CoacheeEnrollment = {
  measure: MeasureInfo["title"];
  status: IndividualEnrollment["status"];
};

export default async function Page({ params: { orgSlug } }: Params) {
  const locale = getLocale();

  const db = orgDb(orgSlug);
  const {
    individualEnrollmentTable,
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
      individualEnrollments: sql<CoacheeEnrollment[]>`
        json_agg(
          json_build_object(
            'measure', ${measureInfoTable.title},
            'status', ${individualEnrollmentTable.status}
          )
        )`,
    })
    .from(userTable)
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .innerJoin(
      individualEnrollmentTable,
      eq(individualEnrollmentTable.coachee, userTable.id)
    )
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
    .groupBy((table) => [table.id, table.firstName, table.lastName]);

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      {coachees.map(({ firstName, lastName, id, individualEnrollments }) => (
        <Stack key={id} direction="horizontal">
          <Link href={`${baseUrl}admin/coachees/${id}`}>
            <Text>
              {firstName} {lastName}
            </Text>
          </Link>
          <Stack>
            {individualEnrollments.map(({ measure, status }) => (
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
