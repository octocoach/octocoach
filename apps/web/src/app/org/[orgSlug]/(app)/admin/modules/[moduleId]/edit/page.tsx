import { orgDb } from "@octocoach/db/connection";
import { Module } from "@octocoach/db/schemas/org/module";
import { fromEntries } from "@octocoach/tshelpers";
import { notFound } from "next/navigation";

import { redirectToModule, saveModule } from "../../actions";
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

  const saveModuleWithSlug = saveModule.bind(null, orgSlug);

  const onDone = redirectToModule.bind(null, mod.id);

  return (
    <EditModule
      module={mod}
      moduleInfo={info}
      orgSlug={orgSlug}
      saveModule={saveModuleWithSlug}
      onDone={onDone}
    />
  );
}
