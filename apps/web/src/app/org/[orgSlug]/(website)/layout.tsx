import { getLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { db, orgDb } from "@octocoach/db/connection";
import { and, eq, sql } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import {
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { mkMeasureModuleTable } from "@octocoach/db/schemas/org/measure-module";
import {
  ModuleWithInfo,
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
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
    .where(eq(organizationTable.slug, params.orgSlug))
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
  const { slug } = organization;

  const organizationDb = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);
  const measureTable = mkMeasureTable(slug);
  const measureInfoTable = mkMeasureInfoTable(slug);
  const moduleTable = mkModuleTable(slug);
  const moduleInfoTable = mkModuleInfoTable(slug);
  const measureModuleTable = mkMeasureModuleTable(slug);

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

  const measures = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
      owner: measureTable.owner,
      slug: measureInfoTable.slug,
      requirements: measureInfoTable.requirements,
      modules: sql<ModuleWithInfo[]>`
        json_agg(
          json_build_object(
            'id', ${moduleTable.id},
            'owner', ${moduleTable.owner},
            'units', ${moduleTable.units},
            'imageSrc', ${moduleTable.imageSrc},
            'imageAlt', ${moduleInfoTable.imageAlt},
            'title', ${moduleInfoTable.title},
            'description', ${moduleInfoTable.description}
          ) ORDER BY ${measureModuleTable.order}
        )`,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .innerJoin(
      measureModuleTable,
      eq(measureModuleTable.measure, measureTable.id)
    )
    .innerJoin(moduleTable, eq(moduleTable.id, measureModuleTable.module))
    .innerJoin(
      moduleInfoTable,
      and(
        eq(moduleTable.id, moduleInfoTable.id),
        eq(moduleInfoTable.locale, locale)
      )
    )
    .groupBy((table) => [
      table.id,
      table.title,
      table.description,
      table.imageSrc,
      table.imageAlt,
      table.owner,
      table.slug,
      table.requirements,
    ])
    .orderBy(measureInfoTable.title);

  const baseUrl = getBaseUrl();

  return (
    <OrganizationProvider organization={{ ...organization, content, measures }}>
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
