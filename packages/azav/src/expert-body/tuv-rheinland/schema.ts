import { Locales } from "@octocoach/i18n/src/i18n-types";

type SubjectArea = 1 | 2 | 3 | 4 | 5 | 6;

type Translation = Record<Locales, string>;

interface Tip {
  text: Translation;
  subjectAreas?: SubjectArea[];
}

interface Section {
  title: Translation;
  description: Translation;
  legalBasis?: {
    text: string;
    href: string;
  }[];
  tips: Tip[];
}

export type FileSchema = Record<number, Section>;
