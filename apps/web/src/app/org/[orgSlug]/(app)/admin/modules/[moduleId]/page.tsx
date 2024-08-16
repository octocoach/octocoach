import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
import { ButtonLink, Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteModuleAction } from "../actions";
import { Delete } from "./delete";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; moduleId: string };
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
      type: moduleTable.type,
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

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      <Text size="xl">{mod.title}</Text>
      <Text size="l">{mod.type}</Text>
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
      <Stack fullWidth direction="horizontal" justify="right">
        <ButtonLink
          Element={Link}
          href={`${baseUrl}admin/modules/${mod.id}/edit`}
        >
          Edit
        </ButtonLink>
        <Delete
          deleteAction={deleteModuleAction.bind(null, params.orgSlug)}
          id={mod.id}
        />
      </Stack>
    </Stack>
  );
}
