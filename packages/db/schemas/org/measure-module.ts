import { relations } from "drizzle-orm";
import { integer, primaryKey, text, unique } from "drizzle-orm/pg-core";

import { mkOrgPgSchema } from "../common/pg-schema";
import { mkMeasureTable } from "./measure";
import { mkModuleTable } from "./module";

export type MeasureModule = ReturnType<
  typeof mkMeasureModuleTable
>["$inferSelect"];
export type NewMeasureModule = ReturnType<
  typeof mkMeasureModuleTable
>["$inferInsert"];

export const mkMeasureModuleTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const moduleTable = mkModuleTable(slug);

  return mkOrgPgSchema(slug).table(
    "measure_module",
    {
      measure: text("measure")
        .notNull()
        .references(() => measureTable.id, {
          onDelete: "restrict",
          onUpdate: "cascade",
        }),
      module: text("module")
        .notNull()
        .references(() => moduleTable.id, {
          onDelete: "restrict",
          onUpdate: "cascade",
        }),
      order: integer("order").notNull(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.measure, table.module] }),
      unq: unique().on(table.measure, table.order),
    })
  );
};

export const mkMeasureModuleRelations = (slug: string) => {
  const measureModuleTable = mkMeasureModuleTable(slug);
  const measureTable = mkMeasureTable(slug);
  const moduleTable = mkModuleTable(slug);

  return relations(measureModuleTable, ({ one }) => ({
    measure: one(measureTable, {
      fields: [measureModuleTable.measure],
      references: [measureTable.id],
      relationName: "measureModule",
    }),
    module: one(moduleTable, {
      fields: [measureModuleTable.module],
      references: [moduleTable.id],
      relationName: "moduleMeasure",
    }),
  }));
};
