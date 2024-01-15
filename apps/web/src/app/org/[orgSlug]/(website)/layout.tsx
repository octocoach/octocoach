import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db, orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import {
  addressTable,
  organizationTable,
} from "@octocoach/db/schemas/public/schema";
import { userTable } from "@octocoach/db/schemas/public/user";
import { Container, Nav } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { OrganizationProvider } from "./context";
import Footer from "./footer";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db
    .select()
    .from(organizationTable)
    .innerJoin(addressTable, eq(addressTable.id, organizationTable.addressId))
    .innerJoin(userTable, eq(userTable.id, organizationTable.owner))
    .then((rows) => {
      if (rows.length !== 1) return null;

      return {
        ...rows[0].organization,
        address: rows[0].address,
        ownerName: rows[0].user.name!,
      };
    });

  if (!organization) {
    notFound();
  }

  const locale = getLocale();

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

  const baseUrl = getBaseUrl();

  return (
    <OrganizationProvider organization={{ ...organization, content }}>
      <Container width="contained">
        <Nav organization={organization} href={baseUrl} />
        {children}
        <Footer organization={organization} baseUrl={baseUrl} />
      </Container>
    </OrganizationProvider>
  );
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
