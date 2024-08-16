import { orgDb } from "@octocoach/db/connection";
import { Module } from "@octocoach/db/schemas/org/module";
import { fromEntries } from "@octocoach/tshelpers";
import { notFound } from "next/navigation";

import { saveModuleAction } from "../../actions";
import { EditModule } from "../../edit";

export default async function Page({
  params: { orgSlug, moduleId },
}: {
  params: { orgSlug: string; moduleId: Module["id"] };
}) {
  const db = orgDb(orgSlug);

  const mod = await db.query.moduleTable.findFirst({
    where: ({ id }, { eq }) => eq(id, moduleId),
  });

  if (!mod) notFound();

  const moduleInfo = await db.query.moduleInfoTable.findMany({
    where: ({ id }, { eq }) => eq(id, moduleId),
  });

  const info = fromEntries(
    moduleInfo.map(({ locale, ...info }) => [locale, info])
  );

  return (
    <EditModule
      module={mod}
      moduleInfo={info}
      orgSlug={orgSlug}
      saveModuleAction={saveModuleAction.bind(null, orgSlug)}
    />
  );
}
