"use client";

import TypesafeI18n from "@octocoach/i18n/src/i18n-react";
import { Locales, Translation } from "@octocoach/i18n/src/i18n-types";
import { loadedLocales } from "@octocoach/i18n/src/i18n-util";
import { loadFormatters } from "@octocoach/i18n/src/i18n-util.async";
import { ReactNode } from "react";

export default function RootLayoutClient({
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
