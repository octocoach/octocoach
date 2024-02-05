import LanguageSwitcher from "@components/language-switcher";
import ThemeSwitcher from "@components/theme-switcher";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { Container, Nav } from "@octocoach/ui";
import { Flavor } from "@octocoach/ui/theme/creator";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Footer from "./footer";
import { getOrganizationWithAddressAndOwnerName } from "./helpers";

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

  const flavor = cookies().get("theme")?.value as Flavor | undefined;

  return (
    <Container width="contained">
      <Nav organization={organization} href={baseUrl}>
        <LanguageSwitcher baseUrl={baseUrl} locale={locale} />
        <ThemeSwitcher flavor={flavor} />
      </Nav>
      {children}
      <Footer organization={organization} baseUrl={baseUrl} />
    </Container>
  );
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
