import { getLocale } from "@helpers/locale";
import { Markdown } from "@octocoach/ui";
import { notFound } from "next/navigation";

import type { Params } from "../../types";
import { getOrganizationWithAddressAndOwnerName } from "../helpers";
import { makeImpressum } from "./content";

export default async function Page({ params: { orgSlug } }: Params) {
  const organization = await getOrganizationWithAddressAndOwnerName(orgSlug);
  const locale = getLocale();

  if (!organization) notFound();

  return <Markdown>{makeImpressum[locale](organization)}</Markdown>;
}
