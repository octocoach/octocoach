"use client";

import { dbLocales } from "@octocoach/db/schemas/data-types/locale";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { fromEntries } from "@octocoach/tshelpers";
import { Button } from "@octocoach/ui";
import { useState } from "react";
import { SaveMeasureData, SaveMeasureRetype } from "./actions";
import { EditMeasure } from "./edit";

type MeasureInfoLocale = SaveMeasureData["measureInfo"][Locales];

export function AddMeasure({
  saveMeasure,
  orgSlug,
}: {
  saveMeasure: (data: SaveMeasureData) => SaveMeasureRetype;
  orgSlug: string;
}) {
  const blankMeasure: SaveMeasureData["measure"] = {
    imageSrc: "",
  };

  const blankMeasureInfo: MeasureInfoLocale = {
    title: "",
    description: "",
    requirements: "",
    imageAlt: "",
    slug: "",
  };

  const defaultValuesMeasureInfo = fromEntries(
    dbLocales.map((locale) => [locale, blankMeasureInfo])
  );

  const [show, setShow] = useState(false);

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Measure</Button>;
  }

  const onDone = () => {
    setShow(false);
  };

  return (
    <EditMeasure
      orgSlug={orgSlug}
      saveMeasure={saveMeasure}
      measure={blankMeasure}
      measureInfo={defaultValuesMeasureInfo}
      onDone={onDone}
    />
  );
}
