import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack, Text } from "@octocoach/ui";

import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; measureSlug: MeasureWithInfo["slug"] };
}) {
  const db = orgDb(params.orgSlug);
  const locale = getLocale();

  const { measureTable, measureInfoTable } = mkOrgSchema(params.orgSlug);
  const measure = await db
    .select({ title: measureInfoTable.title })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(measureInfoTable.slug, params.measureSlug))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  return (
    <Stack>
      <Text size="xl" variation="casual">
        {measure.title}
      </Text>
    </Stack>
  );
}
