import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Stack, Text } from "@octocoach/ui";
import { deleteMeasure } from "../actions";
import { Delete } from "./delete";

export default async function Page({
  params,
}: {
  params: { measureId: number; orgSlug: string };
}) {
  const db = orgDb(params.orgSlug);

  const measureTable = mkMeasureTable(params.orgSlug);
  const measureInfoTable = mkMeasureInfoTable(params.orgSlug);

  const locale = getLocale();

  const measure = await db
    .select()
    .from(measureInfoTable)
    .where(
      and(
        eq(measureInfoTable.id, params.measureId),
        eq(measureInfoTable.locale, locale)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!measure) return <Text>Not Found</Text>;

  const deleteActionWithSlug = deleteMeasure.bind("orgSlug", params.orgSlug);

  return (
    <Stack>
      <Text size="l">{measure.title}</Text>
      <Text>{measure.description}</Text>
      <Delete deleteAction={deleteActionWithSlug} id={measure.id} />
    </Stack>
  );
}
