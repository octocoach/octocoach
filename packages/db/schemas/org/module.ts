import { relations } from "drizzle-orm";
import { integer, primaryKey, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { mkOrgPgSchema } from "../common/pg-schema";
import { localeEnum } from "../data-types/locale";
import { mkCoachTable } from "./coach";
import { mkMeasureModuleTable } from "./measure-module";

export type Module = ReturnType<typeof mkModuleTable>["$inferSelect"];
export type NewModule = ReturnType<typeof mkModuleTable>["$inferInsert"];

export type ModuleInfo = ReturnType<typeof mkModuleInfoTable>["$inferSelect"];
export type NewModuleInfo = ReturnType<
  typeof mkModuleInfoTable
>["$inferInsert"];

export const mkModuleTable = (slug: string) => {
  const coachTable = mkCoachTable(slug);

  return mkOrgPgSchema(slug).table("module", {
    id: serial("id").primaryKey(),
    owner: text("owner")
      .notNull()
      .references(() => coachTable.userId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    units: integer("units").notNull(),
    imageSrc: text("image_src").notNull(),
  });
};

export const insertModuleSchema = (slug: string) =>
  createInsertSchema(mkModuleTable(slug), {
    units: (s) => s.units.positive(),
  });

export const mkModuleRelations = (slug: string) => {
  const moduleTable = mkModuleTable(slug);
  const moduleInfo = mkModuleInfoTable(slug);
  const measureModuleTable = mkMeasureModuleTable(slug);
  const coachTable = mkCoachTable(slug);
  return relations(moduleTable, ({ many, one }) => ({
    moduleInfo: many(moduleInfo),
    measureModule: many(measureModuleTable),
    owner: one(coachTable, {
      fields: [moduleTable.owner],
      references: [coachTable.userId],
    }),
  }));
};

export const mkModuleInfoTable = (slug: string) => {
  const moduleTable = mkModuleTable(slug);
  return mkOrgPgSchema(slug).table(
    "module_info",
    {
      id: serial("id")
        .notNull()
        .references(() => moduleTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      locale: localeEnum("locale").notNull(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      imageAlt: text("image_alt").notNull(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.id, table.locale] }),
    })
  );
};

export const mkModuleInfoRelations = (slug: string) => {
  const measureModuleTable = mkMeasureModuleTable(slug);
  const moduleInfo = mkModuleInfoTable(slug);

  return relations(moduleInfo, ({ many }) => ({
    measureModule: many(measureModuleTable),
  }));
};

export const insertModuleInfoSchema = (slug: string) =>
  createInsertSchema(mkModuleInfoTable(slug), {
    title: (s) => s.title.transform((v) => v.trim()).pipe(s.title.min(1)),
    description: (s) =>
      s.description.transform((v) => v.trim()).pipe(s.description.min(1)),
  });
