import {
  SectionContent,
  SectionId,
  SectionWithLocale,
} from "@octocoach/db/schemas/org/content";
import type { Locales } from "@octocoach/i18n/src/i18n-types";
import { colord } from "colord";

export const createAlpha = (color: string, alpha: number) =>
  colord(color).alpha(alpha).toHslString();

export const getContentById = <T>(
  content: { id: SectionId; value: unknown }[],
  id: SectionId
) => {
  const found = content.find((c) => c.id === id);
  if (!found) {
    console.warn(`Content with id ${id} not found`);
    return {} as T;
  }

  return found.value as T;
};

export const filterContentByLocale = (
  content: { id: SectionId; value: SectionContent; locale: Locales }[],
  locale: Locales
) => content.filter((c) => c.locale === locale);

export const filterContentById = (
  content: { id: SectionId; value: SectionContent; locale: Locales }[],
  id: SectionId
) => content.filter((c) => c.id === id);

export const getContentByLocale = (
  content: SectionWithLocale[],
  locale: Locales
) => {
  const found = content.find((c) => c.locale === locale);
  if (!found) {
    console.warn(`Content with locale ${locale} not found`);
    return {} as SectionContent;
  }

  return found.value as SectionContent;
};
