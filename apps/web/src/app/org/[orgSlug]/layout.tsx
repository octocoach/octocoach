import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { SessionProvider } from "@octocoach/auth/react";
import { db, orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Container, Nav } from "@octocoach/ui";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { OrganizationProvider } from "./context";
import Footer from "./footer";
import ThemeContainer from "./theme-container";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
    with: {
      address: true,
      owner: true,
    },
  });

  if (!organization) {
    notFound();
  }

  const locale = (cookies().get("locale")?.value || "de") as Locales;

  const organizationDb = orgDb(organization.slug);
  const contentTable = mkContentTable(organization.slug);
  const contentLocaleTable = mkContentLocaleTable(organization.slug);

  const content = await organizationDb
    .select({
      id: contentTable.id,
      value: contentLocaleTable.value,
    })
    .from(contentTable)
    .innerJoin(
      contentLocaleTable,
      and(
        eq(contentTable.id, contentLocaleTable.id),
        eq(contentLocaleTable.locale, locale)
      )
    );

  const session = await getServerSession(mkAuthOptions(params.orgSlug));

  return (
    <SessionProvider session={session}>
      <ThemeContainer organization={organization}>
        <Container width="contained">
          <Nav organization={organization} />

          <OrganizationProvider organization={{ ...organization, content }}>
            {children}
            <Footer organization={organization} />
          </OrganizationProvider>
        </Container>
      </ThemeContainer>
    </SessionProvider>
  );
}
