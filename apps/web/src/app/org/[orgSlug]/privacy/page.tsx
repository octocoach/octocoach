"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Markdown } from "@octocoach/ui";
import { useOrganization } from "../context";
import { makePrivacyPolicy } from "./content";

export default function Page() {
  const organization = useOrganization();

  const { locale } = useI18nContext();

  return <Markdown>{makePrivacyPolicy[locale](organization)}</Markdown>;
}
