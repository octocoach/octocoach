"use client";

import { ReactNode, useEffect, useState } from "react";
import { useI18nContext } from "./i18n-react";
import { Namespaces, Translations } from "./i18n-types";
import { loadedLocales } from "./i18n-util";
import { loadNamespaceAsync } from "./i18n-util.async";
import { I18nProvider } from "./react-provider";

export function I18nNamespace({
  namespace,
  children,
}: {
  namespace: Namespaces;
  children: ReactNode;
}) {
  const { setLocale, locale } = useI18nContext();
  const [dictionary, setDictionary] = useState<Translations>();

  useEffect(() => {
    loadNamespaceAsync(locale, namespace).then(() => {
      setLocale(locale);
      setDictionary(loadedLocales[locale]);
    });
  }, [locale, setLocale]);

  if (!dictionary) return null;

  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      {children}
    </I18nProvider>
  );
}
