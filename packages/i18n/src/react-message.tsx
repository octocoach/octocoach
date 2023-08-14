"use client";

import React from "react";
import { LocalizedString } from "typesafe-i18n";
import { useI18nContext } from "./i18n-react";
import { TranslationFunctions, Translations } from "./i18n-types";

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

const hasKey = (
  acc:
    | TranslationFunctions
    | (() => LocalizedString)
    | Record<string, () => LocalizedString>,
  curr: string | keyof typeof acc
): curr is keyof typeof acc => curr in acc;

export type AllTranslationKeys = NestedKeyOf<Translations>;

export default function Message({ id }: { id: AllTranslationKeys }) {
  const { LL } = useI18nContext();

  const keys = id.split(".");

  const translationFunction = keys.reduce((acc, curr) => {
    if (!hasKey(acc, curr)) throw Error(`Can't find the key ${curr}`);

    return acc[curr];
  }, LL) as unknown as () => LocalizedString;

  return <>{translationFunction()}</>;
}
