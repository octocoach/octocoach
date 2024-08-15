import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { ButtonLink, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params: { orgSlug, userId },
}: {
  params: { orgSlug: string; userId: string };
}) {
  const db = orgDb(orgSlug);
  const {
    individualEnrollmentTable,
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

  const individualEnrollments = await db
    .select()
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
    .where(eq(individualEnrollmentTable.coachee, userId));

  return (
    <Stack>
      <Text size="xl" weight="light" variation="casual">
        {user.firstName} {user.lastName}
      </Text>
      <Stack direction="horizontal">
        <ButtonLink href={`${thisPath}/skills`} Element={Link} text="Skills" />
        <ButtonLink href={`${thisPath}/tasks`} Element={Link} text="Tasks" />
      </Stack>
      <Text size="l" weight="semiBold">
        Enrollments
      </Text>
      <Stack>
        {individualEnrollments.map(
          ({ individual_enrollment, measure_info, measure }) => (
            <Link
              key={measure.id}
              href={`${thisPath}/enrollments/${measure.id}`}
            >
              {measure_info.title} ({individual_enrollment.status})
            </Link>
          )
        )}
      </Stack>
    </Stack>
  );
}
