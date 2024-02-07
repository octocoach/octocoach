import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Card, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { saveMeasure } from "./actions";
import { AddMeasure } from "./add";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  await authOrRedirect(params.orgSlug);

  const db = orgDb(params.orgSlug);
  const locale = getLocale();

  const measureTable = mkMeasureTable(params.orgSlug);
  const measureInfoTable = mkMeasureInfoTable(params.orgSlug);

  const measures = await db
    .select()
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureTable.id, measureInfoTable.id),
        eq(measureInfoTable.locale, locale)
      )
    );

  const saveMeasureWithSlug = saveMeasure.bind("orgSlug", params.orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      <Text size="xl" variation="casual">
        Measures
      </Text>
      <Stack>
        {measures.map(({ measure_info: { id, title, description } }) => (
          <Link href={`${baseUrl}/admin/measures/${id}`} key={id}>
            <Card>
              <Text size="l" variation="casual">
                {title}
              </Text>
              <Text>{description}</Text>
            </Card>
          </Link>
        ))}
      </Stack>
      <AddMeasure saveMeasure={saveMeasureWithSlug} orgSlug={params.orgSlug} />
    </Stack>
  );
}
