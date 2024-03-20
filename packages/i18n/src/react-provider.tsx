"use client";

import type { ReactNode } from "react";
import TypesafeI18n from "./i18n-react";
import type { Locales, Translations } from "./i18n-types";
import { loadedLocales } from "./i18n-util";
import { loadFormatters } from "./i18n-util.async";

export function I18nProvider({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode;
  dictionary: Translations;
  locale: Locales;
}) {
  loadedLocales[locale] = dictionary;
  loadFormatters(locale);

  return <TypesafeI18n locale={locale}>{children}</TypesafeI18n>;
}
