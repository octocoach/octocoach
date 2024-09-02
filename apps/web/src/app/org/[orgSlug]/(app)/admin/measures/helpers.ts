import { SaveMeasureData } from "./actions";

export type MappedMeasureInfo = ReturnType<typeof mapMeasureInfo>;

export const mapMeasureInfo = (measureInfo: SaveMeasureData["measureInfo"]) => {
  return {
    title: { en: measureInfo.en.title, de: measureInfo.de.title },
    description: {
      en: measureInfo.en.description,
      de: measureInfo.de.description,
    },
    curriculumIntro: {
      en: measureInfo.en.curriculumIntro,
      de: measureInfo.de.curriculumIntro,
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
      measureInfo.en.screeningQuestions?.map((en, i) => {
        const screeningQuestionsDe = measureInfo.de.screeningQuestions;
        if (!screeningQuestionsDe)
          throw new Error("Missing German screeningQuestions");

        const de = screeningQuestionsDe[i];
        if (!de)
          throw new Error(`Missing German screeningQuestion with index ${i}`);
        return {
          en,
          de,
        };
      }) || [],
  };
};

export const unmapMeasureInfo = (
  m: MappedMeasureInfo
): SaveMeasureData["measureInfo"] => {
  return {
    en: {
      title: m.title.en,
      description: m.description.en,
      curriculumIntro: m.curriculumIntro.en,
      imageAlt: m.imageAlt.en,
      requirements: m.requirements.en,
      screeningQuestions: m.screeningQuestions.map((q) => q.en),
    },
    de: {
      title: m.title.de,
      description: m.description.de,
      curriculumIntro: m.curriculumIntro.de,
      imageAlt: m.imageAlt.de,
      requirements: m.requirements.de,
      screeningQuestions: m.screeningQuestions.map((q) => q.de),
    },
  };
};
