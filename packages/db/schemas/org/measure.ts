import { relations } from "drizzle-orm";
import { primaryKey, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { mkOrgPgSchema } from "../common/pg-schema";
import { localeEnum } from "../data-types/locale";
import { mkCoachTable } from "./coach";
import { mkMeasureModuleTable } from "./measure-module";
import { ModuleWithInfo } from "./module";

export type Measure = ReturnType<typeof mkMeasureTable>["$inferSelect"];
export type NewMeasure = ReturnType<typeof mkMeasureTable>["$inferInsert"];

export type MeasureInfo = ReturnType<typeof mkMeasureInfoTable>["$inferSelect"];
export type NewMeasureInfo = ReturnType<
  typeof mkMeasureInfoTable
>["$inferInsert"];

export type MeasureWithInfo = Omit<Measure & MeasureInfo, "locale">;
export type MeasureWithInfoAndModules = MeasureWithInfo & {
  modules: ModuleWithInfo[];
};

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
    imageSrc: text("image_src").notNull(),
  });
};

export const insertMeasureSchema = (slug: string) =>
  createInsertSchema(mkMeasureTable(slug), {
    imageSrc: (s) =>
      s.imageSrc.transform((v) => v.trim()).pipe(s.imageSrc.min(1)),
  });

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
      imageAlt: text("image_alt").notNull(),
      slug: text("slug").notNull().unique(),
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
    title: (s) => s.title.transform((v) => v.trim()).pipe(s.title.min(1)),
    description: (s) =>
      s.description.transform((v) => v.trim()).pipe(s.description.min(1)),
    requirements: (s) =>
      s.requirements.transform((v) => v.trim()).pipe(s.requirements.min(1)),
    imageAlt: (s) =>
      s.imageAlt.transform((v) => v.trim()).pipe(s.imageAlt.min(1)),
    slug: (s) =>
      s.slug
        .transform((v) => v.trim())
        .pipe(s.slug.min(1).regex(/^[a-z0-9-]+$/)),
  });
