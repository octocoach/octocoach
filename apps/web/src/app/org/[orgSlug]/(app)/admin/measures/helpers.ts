import { SaveMeasureData } from "./actions";

export type MappedMeasureInfo = ReturnType<typeof mapMeasureInfo>;

export const mapMeasureInfo = (measureInfo: SaveMeasureData["measureInfo"]) => {
  return {
    title: { en: measureInfo.en.title, de: measureInfo.de.title },
    description: {
      en: measureInfo.en.description,
      de: measureInfo.de.description,
    },
    requirements: {
      en: measureInfo.en.requirements,
      de: measureInfo.de.requirements,
    },
    imageAlt: {
      en: measureInfo.en.imageAlt,
      de: measureInfo.de.imageAlt,
    },
    screeningQuestions:
      measureInfo.en.screeningQuestions?.map((en, i) => ({
        en,
        de: measureInfo.de.screeningQuestions![i],
      })) || [],
  };
};

export const unmapMeasureInfo = (
  m: MappedMeasureInfo
): SaveMeasureData["measureInfo"] => {
  return {
    en: {
      title: m.title.en,
      description: m.description.en,
      imageAlt: m.imageAlt.en,
      requirements: m.requirements.en,
      screeningQuestions: m.screeningQuestions.map((q) => q.en),
    },
    de: {
      title: m.title.de,
      description: m.description.de,
      imageAlt: m.imageAlt.de,
      requirements: m.requirements.de,
      screeningQuestions: m.screeningQuestions.map((q) => q.de),
    },
  };
};
