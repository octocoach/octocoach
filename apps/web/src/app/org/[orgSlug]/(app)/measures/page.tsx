import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Stack, Text } from "@octocoach/ui";
import { AddMeasure } from "./add";
import { saveMeasure } from "./actions";
import { getBaseUrl } from "@helpers/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const { user } = await authOrRedirect(params.orgSlug);

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
      <Text>Measures</Text>
      <Stack>
        {measures.map(({ measure_info: { id, title, description } }) => (
          <div key={id}>
            <Text>
              <Link href={`${baseUrl}/measures/${id}`}>{title}</Link>
            </Text>
            <Text>{description}</Text>
          </div>
        ))}
      </Stack>
      <AddMeasure saveMeasure={saveMeasureWithSlug} orgSlug={params.orgSlug} />
    </Stack>
  );
}
