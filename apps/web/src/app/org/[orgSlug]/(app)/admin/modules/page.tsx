import type { Params } from "@app/org/[orgSlug]/types";
import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
import { Card, Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";

import { saveModuleAction } from "./actions";
import { AddModule } from "./add";

export default async function Page({ params: { orgSlug } }: Params) {
  await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const locale = getLocale();

  const moduleTable = mkModuleTable(orgSlug);
  const moduleInfoTable = mkModuleInfoTable(orgSlug);

  const modules = await db
    .select()
    .from(moduleTable)
    .innerJoin(
      moduleInfoTable,
      and(
        eq(moduleTable.id, moduleInfoTable.id),
        eq(moduleInfoTable.locale, locale)
      )
    );

  const baseUrl = getBaseUrl();
  return (
    <Stack>
      <Text size="xl">Modules</Text>
      <Stack>
        {modules.map(
          ({
            module_info: { id, title, description, imageAlt },
            module: { units, imageSrc, type },
          }) => (
            <Link href={`${baseUrl}admin/modules/${id}`} key={id}>
              <Card>
                <Image src={imageSrc} height={100} width={100} alt={imageAlt} />
                <Text>
                  {title} ({type})
                </Text>
                <Text>{description}</Text>
                <Text>{units} units</Text>
              </Card>
            </Link>
          )
        )}
      </Stack>
      <AddModule
        saveModuleAction={saveModuleAction.bind(null, orgSlug)}
        orgSlug={orgSlug}
      />
    </Stack>
  );
}
