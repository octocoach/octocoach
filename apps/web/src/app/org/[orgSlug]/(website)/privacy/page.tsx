import { getLocale } from "@helpers/locale";
import { Markdown } from "@octocoach/ui";
import { notFound } from "next/navigation";

import { getOrganizationWithAddressAndOwnerName } from "../helpers";
import { makePrivacyPolicy } from "./content";

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const organization = await getOrganizationWithAddressAndOwnerName(orgSlug);
  const locale = getLocale();

  if (!organization) notFound();

  return <Markdown>{makePrivacyPolicy[locale](organization)}</Markdown>;
}
