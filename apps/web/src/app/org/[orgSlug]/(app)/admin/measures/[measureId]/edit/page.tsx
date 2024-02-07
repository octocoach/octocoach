import { orgDb } from "@octocoach/db/connection";
import { fromEntries } from "@octocoach/tshelpers";
import { notFound } from "next/navigation";
import { redirectToMeasure, saveMeasure } from "../../actions";
import { EditMeasure } from "../../edit";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; measureId: number };
}) {
  const db = orgDb(params.orgSlug);

  const measure = await db.query.measureTable.findFirst({
    where: ({ id }, { eq }) => eq(id, params.measureId),
  });

  if (!measure) notFound();

  const measureInfo = await db.query.measureInfoTable.findMany({
    where: (table, { eq }) => eq(table.id, params.measureId),
  });

  const info = fromEntries(
    measureInfo.map(({ locale, ...info }) => [locale, { ...info }])
  );

  const saveMeasureWithSlug = saveMeasure.bind("orgSlug", params.orgSlug);

  const onDone = redirectToMeasure.bind(null, measure.id);

  return (
    <EditMeasure
      measure={measure}
      measureInfo={info}
      orgSlug={params.orgSlug}
      saveMeasure={saveMeasureWithSlug}
      onDone={onDone}
    />
  );
}
