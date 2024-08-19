import LanguageSwitcher from "@components/language-switcher";
import ThemeSwitcher from "@components/theme-switcher";
import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db } from "@octocoach/db/connection";
import { Container, Nav } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import type { Params } from "../types";

export default async function AppLayout({
  children,
  params: { orgSlug },
}: Params & {
  children: ReactNode;
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  if (!organization) notFound();

  const baseUrl = getBaseUrl();
  const locale = getLocale();

  return (
    <Container width="contained">
      <Nav organization={organization} href={baseUrl}>
        <LanguageSwitcher locale={locale} />
        <ThemeSwitcher />
      </Nav>
      {children}
    </Container>
  );
}
