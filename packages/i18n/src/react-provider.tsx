"use client";

import type { ReactNode } from "react";
import TypesafeI18n from "./i18n-react";
import type { Locales, Translation } from "./i18n-types";
import { loadedLocales } from "./i18n-util";
import { loadFormatters } from "./i18n-util.async";

export function I18nProvider({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode;
  dictionary: Translation;
  locale: Locales;
}) {
  loadedLocales[locale] = dictionary;
  loadFormatters(locale);

  return <TypesafeI18n locale={locale}>{children}</TypesafeI18n>;
}
