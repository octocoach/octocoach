import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { mkOrgPgSchema } from "../common/pg-schema";
import { localeEnum } from "../data-types/locale";
import { measureTypeEnum } from "../data-types/measure";
import { mkCoachTable } from "./coach";
import { mkCohortTable } from "./cohort";
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
    id: text("id").primaryKey(),
    owner: text("owner")
      .notNull()
      .references(() => coachTable.userId, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    imageSrc: text("image_src").notNull(),
    accredited: boolean("accredited").notNull().default(false),
    type: measureTypeEnum("type").notNull().default("cohort"),
    duration: integer("duration").notNull().default(0),
    maxParticipants: integer("max_participants").notNull().default(1),
    rate: numeric("rate", { precision: 5, scale: 2 }).notNull().default("0.00"),
  });
};

export const insertMeasureSchema = (slug: string) =>
  createInsertSchema(mkMeasureTable(slug), {
    id: (s) =>
      s.id.transform((v) => v.trim()).pipe(s.id.min(3).regex(/^[a-z0-9-]+$/)),
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

export const screeningQuestionSchema = z.object({
  question: z.string().min(1),
  type: z.enum(["short", "long", "select", "multi-select"]),
  options: z.array(z.string()).optional(),
});

export type ScreeningQuestion = z.infer<typeof screeningQuestionSchema>;

export const mkMeasureInfoTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  return mkOrgPgSchema(slug).table(
    "measure_info",
    {
      id: text("id")
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
      screeningQuestions: jsonb("screening_questions").$type<
        ScreeningQuestion[]
      >(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.id, table.locale] }),
    })
  );
};

export const mkMeasureInfoRelations = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const measureInfo = mkMeasureInfoTable(slug);
  const cohortTable = mkCohortTable(slug);

  return relations(measureInfo, ({ one, many }) => ({
    measure: one(measureTable, {
      fields: [measureInfo.id],
      references: [measureTable.id],
    }),
    cohorts: many(cohortTable),
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
    screeningQuestions: () => screeningQuestionSchema.array().optional(),
  });
