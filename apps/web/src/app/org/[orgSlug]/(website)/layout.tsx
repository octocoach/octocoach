import { getBaseUrl } from "@helpers/navigation";
import { db, orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Container, Nav } from "@octocoach/ui";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import SetCookie from "set-cookie-parser";
import { OrganizationProvider } from "./context";
import Footer from "./footer";

const getLocale = (): Locales => {
  let locale: Locales;

  const setCookies = SetCookie.parse(headers().get("set-cookie"));
  const setLocaleCookie = setCookies.find((cookie) => cookie.name === "locale");

  console.log("setCookies", setCookies);
  console.log("setLocaleCookie", setLocaleCookie);

  const existingLocaleCookie = cookies().get("locale");

  if (setLocaleCookie?.value) {
    locale = setLocaleCookie.value as Locales;
  } else if (existingLocaleCookie?.value) {
    locale = existingLocaleCookie.value as Locales;
  } else {
    locale = "de";
  }

  console.log("Returning Locale", locale);

  return locale;
};

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
