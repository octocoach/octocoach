import { getBaseUrl } from "@helpers/navigation";
import { Container, Nav } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Footer from "./footer";
import { getOrganizationWithAddressAndOwnerName } from "./helpers";
import LanguageSwitcher from "@components/language-switcher";
import { getLocale } from "@helpers/locale";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await getOrganizationWithAddressAndOwnerName(
    params.orgSlug
  );

  if (!organization) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const locale = getLocale();

  return (
    <Container width="contained">
      <Nav organization={organization} href={baseUrl}>
        <LanguageSwitcher baseUrl={baseUrl} locale={locale} />
      </Nav>
      {children}
      <Footer organization={organization} baseUrl={baseUrl} />
    </Container>
  );
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
