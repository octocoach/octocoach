import LanguageSwitcher from "@components/language-switcher";
import ThemeSwitcher from "@components/theme-switcher";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { Container, Nav } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import type { Params } from "../types";
import Footer from "./footer";
import { getOrganizationWithAddressAndOwnerName } from "./helpers";

export default async function Layout({
  children,
  params: { orgSlug },
}: Params & {
  children: ReactNode;
}) {
  const organization = await getOrganizationWithAddressAndOwnerName(orgSlug);

  if (!organization) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const locale = getLocale();

  return (
    <Container width="contained">
      <Nav organization={organization} href={baseUrl}>
        <LanguageSwitcher locale={locale} />
        <ThemeSwitcher />
      </Nav>
      {children}
      <Footer organization={organization} baseUrl={baseUrl} />
    </Container>
  );
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
