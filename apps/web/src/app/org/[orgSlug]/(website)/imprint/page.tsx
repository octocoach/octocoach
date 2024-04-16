import { getLocale } from "@helpers/locale";
import { Markdown } from "@octocoach/ui";
import { notFound } from "next/navigation";

import { getOrganizationWithAddressAndOwnerName } from "../helpers";
import { makeImpressum } from "./content";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const organization = await getOrganizationWithAddressAndOwnerName(
    params.orgSlug
  );
  const locale = getLocale();

  if (!organization) notFound();

  return <Markdown>{makeImpressum[locale](organization)}</Markdown>;
}
