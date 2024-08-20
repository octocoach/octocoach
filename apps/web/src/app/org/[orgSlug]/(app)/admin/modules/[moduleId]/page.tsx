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

import type { Params as ParentParams } from "../../../../types";
import { deleteModuleAction } from "../actions";
import { Delete } from "./delete";

export type Params = ParentParams & { params: { moduleId: string } };

export default async function Page({ params: { orgSlug, moduleId } }: Params) {
  const db = orgDb(orgSlug);

  const moduleTable = mkModuleTable(orgSlug);
  const moduleInfoTable = mkModuleInfoTable(orgSlug);

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
      and(eq(moduleTable.id, moduleId), eq(moduleInfoTable.locale, locale))
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
          deleteAction={deleteModuleAction.bind(null, orgSlug)}
          id={mod.id}
        />
      </Stack>
    </Stack>
  );
}
