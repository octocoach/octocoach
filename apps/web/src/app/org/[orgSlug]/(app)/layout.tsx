import LanguageSwitcher from "@components/language-switcher";
import ThemeSwitcher from "@components/theme-switcher";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db } from "@octocoach/db/connection";
import { Container, Nav } from "@octocoach/ui";
import { Flavor } from "@octocoach/ui/theme/creator";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, params.orgSlug),
  });

  if (!organization) notFound();

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
    </Container>
  );
}
