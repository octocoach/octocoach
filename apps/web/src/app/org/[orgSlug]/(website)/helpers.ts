import { getLocale } from "@helpers/locale";
import { orgDb } from "@octocoach/db/connection";
import { and, eq, inArray, sql } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
  SectionContent,
  SectionContentSimple,
  SectionId,
  websiteSections,
} from "@octocoach/db/schemas/org/content";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { ModuleWithInfo } from "@octocoach/db/schemas/org/module";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { userTable } from "@octocoach/db/schemas/public/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { addBusinessDays } from "date-fns";
import Holidays from "date-holidays";
import { notFound } from "next/navigation";

import {
  AboutSectionContent,
  FaqSectionContent,
  HeroSectionContent,
  TestimonialsSectionContent,
} from "./_sections";

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
    case "faq":
      return value as FaqSectionContent;
    case "mission":
      return value as SectionContentSimple;
    case "testimonials":
      return value as TestimonialsSectionContent;
    default:
      console.warn(`Unknown Section ID: ${id}`);
      return {};
  }
};

type ContentMap = {
  hero: HeroSectionContent;
  about: AboutSectionContent;
  faq: FaqSectionContent;
  mission: SectionContentSimple;
  testimonials: TestimonialsSectionContent;
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
    .where(inArray(contentTable.id, [...websiteSections]))
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
    .then((rows) => (rows[0]?.value as T) ?? null);

  return content;
};

export const getMeasuresWithInfo = async (slug: string) => {
  const locale = getLocale();
  const db = orgDb(slug);
  const { measureTable, measureInfoTable } = mkOrgSchema(slug);

  return await db
    .select({
      id: measureTable.id,
      type: measureTable.type,
      title: measureInfoTable.title,
      accredited: measureTable.accredited,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
      owner: measureTable.owner,
      requirements: measureInfoTable.requirements,
      screeningQuestions: measureInfoTable.screeningQuestions,
      duration: measureTable.duration,
      maxParticipants: measureTable.maxParticipants,
      rate: measureTable.rate,
      curriculumIntro: measureInfoTable.curriculumIntro,
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
      type: measureTable.type,
      title: measureInfoTable.title,
      accredited: measureTable.accredited,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
      owner: measureTable.owner,
      requirements: measureInfoTable.requirements,
      screeningQuestions: measureInfoTable.screeningQuestions,
      duration: measureTable.duration,
      maxParticipants: measureTable.maxParticipants,
      rate: measureTable.rate,
      curriculumIntro: measureInfoTable.curriculumIntro,
      modules: sql<ModuleWithInfo[]>`
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', ${moduleTable.id},
            'owner', ${moduleTable.owner},
            'units', ${moduleTable.units},
            'imageSrc', ${moduleTable.imageSrc},
            'imageAlt', ${moduleInfoTable.imageAlt},
            'title', ${moduleInfoTable.title},
            'description', ${moduleInfoTable.description}
          )
          ORDER BY ${measureModuleTable.order}
        ) FILTER (WHERE ${moduleTable.id} IS NOT NULL),
        '[]'
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
      table.requirements,
      table.screeningQuestions,
      table.curriculumIntro,
    ])
    .orderBy(measureInfoTable.title);
};

export const getMeasureWithInfoAndModules = async (
  orgSlug: string,
  measureId: Measure["id"],
  locale?: Locales
) => {
  if (!locale) locale = getLocale();

  if (!locale) throw new Error("No locale provided");

  const db = orgDb(orgSlug);
  const {
    measureTable,
    measureInfoTable,
    moduleTable,
    moduleInfoTable,
    measureModuleTable,
  } = mkOrgSchema(orgSlug);

  const measure = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      type: measureTable.type,
      accredited: measureTable.accredited,
      description: measureInfoTable.description,
      imageSrc: measureTable.imageSrc,
      imageAlt: measureInfoTable.imageAlt,
      owner: measureTable.owner,
      requirements: measureInfoTable.requirements,
      duration: measureTable.duration,
      maxParticipants: measureTable.maxParticipants,
      rate: measureTable.rate,
      screeningQuestions: measureInfoTable.screeningQuestions,
      curriculumIntro: measureInfoTable.curriculumIntro,
      modules: sql<ModuleWithInfo[]>`
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', ${moduleTable.id},
            'owner', ${moduleTable.owner},
            'units', ${moduleTable.units},
            'imageSrc', ${moduleTable.imageSrc},
            'imageAlt', ${moduleInfoTable.imageAlt},
            'title', ${moduleInfoTable.title},
            'description', ${moduleInfoTable.description}
          )
          ORDER BY ${measureModuleTable.order}
        ) FILTER (WHERE ${moduleTable.id} IS NOT NULL),
        '[]'
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
    .leftJoin(
      measureModuleTable,
      eq(measureModuleTable.measure, measureTable.id)
    )
    .leftJoin(moduleTable, eq(moduleTable.id, measureModuleTable.module))
    .leftJoin(
      moduleInfoTable,
      and(
        eq(moduleTable.id, moduleInfoTable.id),
        eq(moduleInfoTable.locale, locale)
      )
    )
    .where(eq(measureTable.id, measureId))
    .groupBy((table) => [
      table.id,
      table.title,
      table.description,
      table.imageSrc,
      table.imageAlt,
      table.owner,
      table.requirements,
      table.screeningQuestions,
      table.curriculumIntro,
    ])
    .then((rows) => rows[0] ?? null);

  return measure;
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
      const row = rows[0];

      if (!row) notFound();

      return {
        ...row.organization,
        address: row.address!,
        ownerName: row.user.name!,
      };
    });
};

export const getEndDate = (startDate: Date, duration: number) => {
  const holidays = new Holidays("DE", "nw");

  const durationInDays = duration * 5;
  const businessDays: Date[] = [];

  let day = 0;
  let numberOfHolidays = 0;

  while (day < durationInDays) {
    const date = addBusinessDays(startDate, day + numberOfHolidays);
    const dateHolidays = holidays.isHoliday(date);

    if (
      !(
        dateHolidays &&
        dateHolidays.some((h) => h.type === "bank" || h.type === "public")
      )
    ) {
      businessDays.push(date);
      day += 1;
    } else {
      numberOfHolidays += 1;
    }
  }

  const endDate = businessDays.at(-1);
  if (!endDate) throw new Error("No last date");

  return endDate;
};
