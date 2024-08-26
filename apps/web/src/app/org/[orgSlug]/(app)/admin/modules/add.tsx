"use client";

import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { fromEntries } from "@octocoach/tshelpers";
import { Button } from "@octocoach/ui";
import { useState } from "react";

import { SaveModuleData, SaveModuleRetype } from "./actions";
import { EditModule } from "./edit";

export function AddModule({
  saveModuleAction,
  orgSlug,
  baseUrl,
}: {
  orgSlug: string;
  saveModuleAction: (data: SaveModuleData) => SaveModuleRetype;
  baseUrl: string;
}) {
  const blankModule: SaveModuleData["module"] = {
    id: "",
    units: 1,
    imageSrc: "",
    type: "occupational",
  };

  const blankModuleInfo = fromEntries(
    dbLocales.map((locale) => [
      locale,
      { title: "", description: "", imageAlt: "" },
    ])
  );

  const [show, setShow] = useState(false);

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Module</Button>;
  }

  return (
    <EditModule
      orgSlug={orgSlug}
      saveModuleAction={saveModuleAction}
      module={blankModule}
      moduleInfo={blankModuleInfo}
      baseUrl={baseUrl}
    />
  );
}
