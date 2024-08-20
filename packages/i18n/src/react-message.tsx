"use client";

import { LocalizedString } from "typesafe-i18n";

import { useI18nContext } from "./i18n-react";
import { TranslationFunctions, Translations } from "./i18n-types";

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`
  : never;

const hasKey = (
  acc:
    | TranslationFunctions
    | (() => LocalizedString)
    | Record<string, () => LocalizedString>,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  curr: string | keyof typeof acc
): curr is keyof typeof acc => curr in acc;

export type AllTranslationKeys = NestedKeyOf<Translations>;

export default function Message({
  id,
  params,
}: {
  id: AllTranslationKeys;
  params?: Record<string, unknown>;
}) {
  const { LL } = useI18nContext();

  const keys = id.split(".");

  const translationFunction = keys.reduce((acc, curr) => {
    if (!hasKey(acc, curr))
      throw Error(
        `Can't find the key ${curr}.
        If the translation is in a namespace, make sure to use the <I18nNamespace/> component`
      );

    return acc[curr];
  }, LL) as unknown as (params?: Record<string, unknown>) => LocalizedString;

  return <>{translationFunction(params)}</>;
}
