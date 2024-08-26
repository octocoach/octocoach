import { FlavorName } from "@catppuccin/palette";
import {
  ContentLocale,
  SectionContent,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import type { Locales } from "@octocoach/i18n/src/i18n-types";
import { colord } from "colord";

export const createAlpha = (color: string, alpha: number) =>
  colord(color).alpha(alpha).toHslString();

const image = {
  src: "",
  alt: "",
};

const defaultContent: Record<SectionId, SectionContent> = {
  hero: {
    title: "",
    text: "",
    image,
  },
  about: {
    title: "",
    text: "",
  },
  method: {
    title: "",
    subSections: [],
  },
  faq: {
    title: "",
    questions: [],
  },
  mission: {
    title: "",
    text: "",
  },
  testimonials: {
    title: "",
    subSections: [],
  },
};

export const getContent = <T = SectionContent>(
  content: ContentLocale[],
  id: SectionId,
  locale: Locales
) => {
  const found = content.find((c) => c.locale === locale && c.id === id);
  if (!found) {
    console.warn(`Content with locale ${locale} not found`);
    return defaultContent[id] as T;
  }

  return found.value as T;
};

export const prefersDarkQuery = "(prefers-color-scheme: dark)";

export const isDarkMode = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(prefersDarkQuery).matches;
};

export const getSystemTheme = (): FlavorName => {
  return isDarkMode() ? "mocha" : "latte";
};
