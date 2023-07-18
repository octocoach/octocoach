"use client";

import React from "react";

import { useI18nContext } from "./i18n-react";
import { Translations } from "./i18n-types";

export default function Message({ id }: { id: keyof Translations }) {
  const { LL } = useI18nContext();

  return <>{LL[id]()}</>;
}
