import { relations } from "drizzle-orm";
import { json, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { mkOrgPgSchema } from "../common/pg-schema";
import { localeEnum } from "../data-types/locale";
import { mkCoachTable } from "./coach";
import { ContentImage } from "./content";
import { mkMeasureModuleTable } from "./measure-module";

export type Measure = ReturnType<typeof mkMeasureTable>["$inferSelect"];
export type NewMeasure = ReturnType<typeof mkMeasureTable>["$inferInsert"];

export type MeasureInfo = ReturnType<typeof mkMeasureInfoTable>["$inferSelect"];
export type NewMeasureInfo = ReturnType<
  typeof mkMeasureInfoTable
>["$inferInsert"];

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

export const insertMeasureInfoSchema = (slug: string) =>
  createInsertSchema(mkMeasureInfoTable(slug), {
    title: (s) => s.title.min(1),
    description: (s) => s.description.min(1),
    requirements: (s) => s.requirements.min(1),
  });
