import { json, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";

import { relations } from "drizzle-orm";
import { localeEnum } from "../data-types/locale";
import { mkCoachTable } from "./coach";
import { ContentImage } from "./content";
import { mkMeasureModuleTable } from "./measure-module";

export type Measure = typeof _measureTable.$inferSelect;
export type NewMeasure = typeof _measureTable.$inferInsert;

export type MeasureInfo = typeof _measureInfoTable.$inferSelect;
export type NewMeasureInfo = typeof _measureInfoTable.$inferInsert;

export const mkMeasureTable = (slug: string) => {
  const coachTable = mkCoachTable(slug);
  return mkOrgPgSchema(slug).table("measure", {
    id: serial("id").primaryKey(),
    owner: text("owner")
      .notNull()
      .references(() => coachTable.userId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  });
};

export const mkMeasureRelations = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const measureInfo = mkMeasureInfoTable(slug);
  const measureModuleTable = mkMeasureModuleTable(slug);
  const coachTable = mkCoachTable(slug);

  return relations(measureTable, ({ many, one }) => ({
    measureInfo: many(measureInfo),
    measureModule: many(measureModuleTable),
    owner: one(coachTable, {
      fields: [measureTable.owner],
      references: [coachTable.userId],
    }),
  }));
};

export const mkMeasureInfoTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  return mkOrgPgSchema(slug).table(
    "measure_info",
    {
      id: serial("id")
        .notNull()
        .references(() => measureTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      locale: localeEnum("locale").notNull(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      requirements: text("requirements").notNull(),
      image: json("image").$type<ContentImage>(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.id, table.locale] }),
    })
  );
};

export const mkMeasureInfoRelations = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const measureInfo = mkMeasureInfoTable(slug);

  return relations(measureInfo, ({ one }) => ({
    measure: one(measureTable, {
      fields: [measureInfo.id],
      references: [measureTable.id],
    }),
  }));
};

const _measureTable = mkMeasureTable("org");
const _measureInfoTable = mkMeasureInfoTable("org");
