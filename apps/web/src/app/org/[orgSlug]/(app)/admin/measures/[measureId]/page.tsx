import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, isNull } from "@octocoach/db/operators";
import {
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { mkMeasureModuleTable } from "@octocoach/db/schemas/org/measure-module";
import {
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
import { ButtonLink, Stack, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { deleteMeasure } from "../actions";
import { AddModuleToMeasure } from "./add-module";
import { Delete } from "./delete";
import { ModulesCompoent } from "./modules";
import { getBaseUrl } from "@helpers/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { measureId: string; orgSlug: string };
}) {
  const db = orgDb(params.orgSlug);

  const measureTable = mkMeasureTable(params.orgSlug);
  const measureInfoTable = mkMeasureInfoTable(params.orgSlug);
  const measureModuleTable = mkMeasureModuleTable(params.orgSlug);
  const moduleTable = mkModuleTable(params.orgSlug);
  const moduleInfoTable = mkModuleInfoTable(params.orgSlug);

  const locale = getLocale();

  const measure = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      description: measureInfoTable.description,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(measureTable.id, params.measureId))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  const addedModules = await db
    .select({
      id: moduleTable.id,
      title: moduleInfoTable.title,
      description: moduleInfoTable.description,
      imageSrc: moduleTable.imageSrc,
      imageAlt: moduleInfoTable.imageAlt,
      units: moduleTable.units,
      owner: moduleTable.owner,
    })
    .from(measureModuleTable)
    .innerJoin(moduleTable, eq(measureModuleTable.module, moduleTable.id))
    .innerJoin(moduleInfoTable, eq(moduleInfoTable.id, moduleTable.id))
    .where(
      and(
        eq(measureModuleTable.measure, measure.id),
        eq(moduleInfoTable.locale, locale)
      )
    )
    .orderBy(measureModuleTable.order);

  const availableModules = await db
    .select({
      id: moduleTable.id,
      title: moduleInfoTable.title,
      description: moduleInfoTable.description,
      imageSrc: moduleTable.imageSrc,
      imageAlt: moduleInfoTable.imageAlt,
      units: moduleTable.units,
      owner: moduleTable.owner,
    })
    .from(moduleTable)
    .innerJoin(moduleInfoTable, eq(moduleInfoTable.id, moduleTable.id))
    .leftJoin(measureModuleTable, eq(measureModuleTable.module, moduleTable.id))
    .where(
      and(
        eq(moduleInfoTable.locale, locale),
        isNull(measureModuleTable.measure)
      )
    );

  const deleteActionWithSlug = deleteMeasure.bind("orgSlug", params.orgSlug);

  const baseUrl = getBaseUrl();
  return (
    <Stack>
      <Text size="l">{measure.title}</Text>
      <Text>{measure.description}</Text>
      <ModulesCompoent
        measureId={measure.id}
        modules={addedModules}
        orgSlug={params.orgSlug}
      />
      <AddModuleToMeasure
        modules={availableModules}
        measureId={measure.id}
        orgSlug={params.orgSlug}
      />
      <Stack direction="horizontal" align="right">
        <ButtonLink
          href={`${baseUrl}admin/measures/${measure.id}/edit`}
          Element={Link}
        >
          Edit
        </ButtonLink>
        <Delete deleteAction={deleteActionWithSlug} id={measure.id} />
      </Stack>
    </Stack>
  );
}
