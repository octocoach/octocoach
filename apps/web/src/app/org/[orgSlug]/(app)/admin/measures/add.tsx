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
  saveMeasureAction,
  orgSlug,
  baseUrl,
}: {
  saveMeasureAction: (data: SaveMeasureData) => SaveMeasureRetype;
  orgSlug: string;
  baseUrl: string;
}) {
  const blankMeasure: SaveMeasureData["measure"] = {
    id: "",
    type: "cohort",
    imageSrc: "",
    accredited: false,
    duration: 0,
    maxParticipants: 1,
    rate: "0.00",
  };

  const blankMeasureInfo: MeasureInfoLocale = {
    title: "",
    description: "",
    curriculumIntro: "",
    requirements: "",
    imageAlt: "",
    screeningQuestions: [],
  };

  const defaultValuesMeasureInfo = fromEntries(
    dbLocales.map((locale) => [locale, blankMeasureInfo])
  );

  const [show, setShow] = useState(false);

  if (!show) {
    return <Button onClick={() => setShow(true)}>Add a Measure</Button>;
  }

  return (
    <EditMeasure
      orgSlug={orgSlug}
      saveMeasureAction={saveMeasureAction}
      measure={blankMeasure}
      measureInfo={defaultValuesMeasureInfo}
      baseUrl={baseUrl}
    />
  );
}
