"use client";

import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { fromEntries } from "@octocoach/tshelpers";
import { Button } from "@octocoach/ui";
import { useState } from "react";
import { SaveModuleData, SaveModuleRetype } from "./actions";
import { EditModule } from "./edit";

export function AddModule({
  saveModule,
  orgSlug,
}: {
  orgSlug: string;
  saveModule: (data: SaveModuleData) => SaveModuleRetype;
}) {
  const blankModule: SaveModuleData["module"] = {
    units: 1,
    imageSrc: "",
  };

  const blankModuleInfo = fromEntries(
    dbLocales.map((locale) => [
      locale,
      { title: "", description: "", imageAlt: "" },
    ])
  );

  const [show, setShow] = useState(false);

  const onDone = () => {
    setShow(false);
  };

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Module</Button>;
  }

  return (
    <EditModule
      orgSlug={orgSlug}
      saveModule={saveModule}
      module={blankModule}
      moduleInfo={blankModuleInfo}
      onDone={onDone}
    />
  );
}
