import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, not, sql } from "@octocoach/db/operators";
import {
  SectionContent,
  SectionContentSimple,
  SectionId,
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import { addressTable } from "@octocoach/db/schemas/common/address";
import { ModuleWithInfo } from "@octocoach/db/schemas/org/module";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import {
  AboutSectionContent,
  CoachSectionContent,
  FaqSectionContent,
  HeroSectionContent,
  MethodSectionContent,
} from "@octocoach/ui";
import { userTable } from "@octocoach/db/schemas/public/schema";
import { notFound } from "next/navigation";

const getValue = ({
  id,
  value,
}: {
  id: SectionId;
  value: SectionContent | null;
}) => {
  if (!value) return {};
  switch (id) {
    case "hero":
      return value as HeroSectionContent;
    case "about":
      return value as AboutSectionContent;
    case "coach":
      return value as CoachSectionContent;
    case "faq":
      return value as CoachSectionContent;
    case "method":
      return value as MethodSectionContent;
    case "mission":
      return value as SectionContentSimple;
    default:
      throw new Error(`Unknown section id: ${id}`);
  }
};

type ContentMap = {
  hero: HeroSectionContent;
  about: AboutSectionContent;
  coach: CoachSectionContent;
  faq: FaqSectionContent;
  mission: SectionContentSimple;
};

export const getContent = async (slug: string): Promise<ContentMap> => {
  const db = orgDb(slug);
  const locale = getLocale();

  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  const content = await db
    .select({ id: contentTable.id, value: contentLocaleTable.value })
    .from(contentTable)
    .innerJoin(
      contentLocaleTable,
      and(
        eq(contentTable.id, contentLocaleTable.id),
        eq(contentLocaleTable.locale, locale)
      )
    )
    .then((res) =>
      res.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: getValue(curr),
        }),
        {} as ContentMap
      )
    );

  return content;
};

export const getContentById = async <T>(slug: string, id: SectionId) => {
  const db = orgDb(slug);
  const locale = getLocale();

  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  const content = await db
    .select({ id: contentTable.id, value: contentLocaleTable.value })
    .from(contentTable)
    .innerJoin(
      contentLocaleTable,
      and(
        eq(contentTable.id, contentLocaleTable.id),
        eq(contentLocaleTable.locale, locale)
      )
    )
    .where(eq(contentTable.id, id))
    .then((rows) => (rows[0].value as T) ?? null);

  return content;
};

export const getMeasuresWithInfo = async (slug: string) => {
  const locale = getLocale();
  const db = orgDb(slug);
  const { measureTable, measureInfoTable } = mkOrgSchema(slug);

  return await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
      owner: measureTable.owner,
      slug: measureInfoTable.slug,
      requirements: measureInfoTable.requirements,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .orderBy(measureInfoTable.title);
};

export const getMeasuresWithInfoAndModules = async (slug: string) => {
  const locale = getLocale();
  const db = orgDb(slug);
  const {
    measureTable,
    measureInfoTable,
    moduleTable,
    moduleInfoTable,
    measureModuleTable,
  } = mkOrgSchema(slug);

  return await db
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
};

export type OrganizationWithContent = Awaited<
  ReturnType<typeof getOrganizationWithAddressAndOwnerName>
>;

export const getOrganizationWithAddressAndOwnerName = async (slug: string) => {
  const db = orgDb(slug);
  const { organizationTable, addressTable } = mkOrgSchema(slug);

  return await db
    .select()
    .from(organizationTable)
    .leftJoin(addressTable, eq(addressTable.id, organizationTable.addressId))
    .innerJoin(userTable, eq(userTable.id, organizationTable.owner))
    .where(eq(organizationTable.slug, slug))
    .then((rows) => {
      if (rows.length !== 1) notFound();

      return {
        ...rows[0].organization,
        address: rows[0].address!,
        ownerName: rows[0].user.name!,
      };
    });
};
