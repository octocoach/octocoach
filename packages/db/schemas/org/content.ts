import { json, pgEnum, primaryKey, text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";

export interface ContentImage {
  src: string;
  alt: string;
}
export type Content = typeof _contentTable.$inferSelect;
export type NewContent = typeof _contentTable.$inferInsert;
export type ContentLocale = typeof _contentLocaleTable.$inferSelect;
export type NewContentLocale = typeof _contentLocaleTable.$inferInsert;

export const localeEnum = pgEnum("locale", ["en", "de"]);

export const mkContentTable = (slug: string) => {
  return mkOrgPgSchema(slug).table("content", {
    id: text("id").notNull().primaryKey(),
    image: json("image").$type<ContentImage>(),
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
        }),
      locale: localeEnum("locale").notNull(),
      value: json("value"),
    },
    (table) => ({
      pk: primaryKey(table.id, table.locale),
    })
  );
};

const _contentTable = mkContentTable("org");
const _contentLocaleTable = mkContentLocaleTable("org");
