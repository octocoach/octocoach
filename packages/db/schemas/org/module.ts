import { relations } from "drizzle-orm";
import { integer, jsonb, pgEnum, primaryKey, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export type ModuleWithInfo = Omit<Module & ModuleInfo, "locale">;

export type ModuleContent = z.infer<typeof moduleContentSchema>;

export const moduleTypeEnum = pgEnum("module_type", [
  "occupational",
  "general",
]);

export const mkModuleTable = (slug: string) => {
  const coachTable = mkCoachTable(slug);

  return mkOrgPgSchema(slug).table("module", {
    id: text("id").primaryKey(),
    owner: text("owner")
      .notNull()
      .references(() => coachTable.userId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    type: moduleTypeEnum("type").notNull().default("occupational"),
    units: integer("units").notNull(),
    imageSrc: text("image_src").notNull(),
  });
};

export const insertModuleSchema = (slug: string) =>
  createInsertSchema(mkModuleTable(slug), {
    id: (s) =>
      s.id.transform((v) => v.trim()).pipe(s.id.min(3).regex(/^[a-z0-9-]+$/)),
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
      id: text("id")
        .notNull()
        .references(() => moduleTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      locale: localeEnum("locale").notNull(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      imageAlt: text("image_alt").notNull(),
      content: jsonb("content").$type<ModuleContent>(),
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

const moduleContentSchema = z.object({
  links: z.array(
    z.object({
      type: z.enum(["internal", "external"]),
      url: z.string().min(1),
      title: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
    })
  ),
});

export const insertModuleInfoSchema = (slug: string) =>
  createInsertSchema(mkModuleInfoTable(slug), {
    title: (s) => s.title.transform((v) => v.trim()).pipe(s.title.min(1)),
    description: (s) =>
      s.description.transform((v) => v.trim()).pipe(s.description.min(1)),
    content: moduleContentSchema,
  });
