"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Box, Markdown } from "@octocoach/ui";
import { useOrganization } from "../context";
import { makeImpressum } from "./content";

export default function Page({ params }: { params: { orgSlug } }) {
  const organization = useOrganization();

  const { locale } = useI18nContext();

  return (
    <Box>
      <Markdown>{makeImpressum[locale](organization)}</Markdown>
    </Box>
  );
}
