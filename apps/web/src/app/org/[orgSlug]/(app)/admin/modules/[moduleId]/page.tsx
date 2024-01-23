import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
import { Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import { notFound } from "next/navigation";
import { deleteModule } from "../actions";
import { Delete } from "./delete";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; moduleId: number };
}) {
  const db = orgDb(params.orgSlug);

  const moduleTable = mkModuleTable(params.orgSlug);
  const moduleInfoTable = mkModuleInfoTable(params.orgSlug);

  const locale = getLocale();

  const mod = await db
    .select({
      id: moduleTable.id,
      units: moduleTable.units,
      title: moduleInfoTable.title,
      description: moduleInfoTable.description,
      imageSrc: moduleTable.imageSrc,
      imageAlt: moduleInfoTable.imageAlt,
    })
    .from(moduleTable)
    .innerJoin(
      moduleInfoTable,
      and(
        eq(moduleTable.id, params.moduleId),
        eq(moduleInfoTable.locale, locale)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!mod) notFound();

  const deleteActionWithSlug = deleteModule.bind("orgSlug", params.orgSlug);

  return (
    <Stack>
      <Text size="xl">{mod.title}</Text>
      <Image
        src={mod.imageSrc}
        height={200}
        width={200}
        alt={mod.imageAlt}
        style={{
          imageRendering: "pixelated",
        }}
      />
      <Text>{mod.description}</Text>
      <Delete deleteAction={deleteActionWithSlug} id={mod.id} />
    </Stack>
  );
}
