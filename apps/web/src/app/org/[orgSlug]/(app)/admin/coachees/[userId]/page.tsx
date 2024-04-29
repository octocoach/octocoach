import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params: { orgSlug, userId },
}: {
  params: { orgSlug: string; userId: string };
}) {
  const db = orgDb(orgSlug);
  const {
    enrollmentTable,
    measureTable,
    measureInfoTable,
    userTable,
    userProfileTable,
  } = mkOrgSchema(orgSlug);

  const baseUrl = getBaseUrl();
  const thisPath = `${baseUrl}admin/coachees/${userId}`;
  const locale = getLocale();

  const user = await db
    .select({
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
    })
    .from(userTable)
    .innerJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
    .where(eq(userTable.id, userId))
    .then((rows) => getFirstRow(rows));

  const enrollments = await db
    .select()
    .from(enrollmentTable)
    .innerJoin(measureTable, eq(measureTable.id, enrollmentTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(enrollmentTable.coachee, userId));

  return (
    <Stack>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <Link href={`${thisPath}/skills`}>Skills</Link>
      <Link href={`${thisPath}/tasks`}>Tasks</Link>
      <Text>Enrollments</Text>
      <Stack>
        {enrollments.map(({ enrollment, measure_info, measure }) => (
          <Link key={measure.id} href={`${thisPath}/enrollments/${measure.id}`}>
            <Text>
              {measure_info.title} ({enrollment.status})
            </Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
