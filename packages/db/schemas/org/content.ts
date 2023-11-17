import { json, pgEnum, primaryKey, text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";

export type Content = typeof _contentTable.$inferSelect;
export type NewContent = typeof _contentTable.$inferInsert;
export type ContentLocale = typeof _contentLocaleTable.$inferSelect;
export type NewContentLocale = typeof _contentLocaleTable.$inferInsert;

export type ContentLocaleTypeOf<T> = Omit<ContentLocale, "value"> & {
  value: T;
};

export type SectionId =
  | "hero"
  | "about"
  | "coach"
  | "method"
  | "faq"
  | "mission";

export type SectionContent =
  | SectionContentSimple
  | SectionContentWithImage
  | SectionContentWithSubSections
  | SectionContentFAQ;

export interface ContentImage {
  src: string;
  alt: string;
}

export type SectionContentSimple = {
  title: string;
  text: string;
};

export type SectionContentWithImage = SectionContentSimple & {
  image: ContentImage;
};

export type SectionContentWithSubSections = {
  title: string;
  subSections: SectionContentWithImage[];
};

export type FAQQuestion = {
  question: string;
  answer: string;
};

export type SectionContentFAQ = {
  title: string;
  questions: FAQQuestion[];
};

export const localeEnum = pgEnum("locale", ["en", "de"]);

export const mkContentTable = (slug: string) => {
  return mkOrgPgSchema(slug).table("content", {
    id: text("id").notNull().primaryKey().$type<SectionId>(),
  });
};

export const mkContentLocaleTable = (slug: string) => {
  const contentTable = mkContentTable(slug);

  return mkOrgPgSchema(slug).table(
    "content_locale",
    {
      id: text("id")
        .notNull()
        .references(() => contentTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        })
        .$type<SectionId>(),
      locale: localeEnum("locale").notNull(),
      value: json("value").$type<SectionContent>(),
    },
    (table) => ({
      pk: primaryKey(table.id, table.locale),
    })
  );
};

const _contentTable = mkContentTable("org");
const _contentLocaleTable = mkContentLocaleTable("org");
