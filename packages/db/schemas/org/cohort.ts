import { relations } from "drizzle-orm";
import { date, text } from "drizzle-orm/pg-core";

import { mkOrgPgSchema } from "../common/pg-schema";
import { mkMeasureTable } from "./measure";

export type Cohort = ReturnType<typeof mkCohortTable>["$inferSelect"];
export type NewCohort = ReturnType<typeof mkCohortTable>["$inferInsert"];

export const mkCohortTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);

  return mkOrgPgSchema(slug).table("cohort", {
    id: text("id").primaryKey(),
    measure: text("measure")
      .notNull()
      .references(() => measureTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    startDate: date("start_date").notNull(),
  });
};

export const mkCohortRelations = (slug: string) => {
  const cohortTable = mkCohortTable(slug);
  const measureTable = mkMeasureTable(slug);

  return relations(cohortTable, ({ one }) => ({
    measure: one(measureTable, {
      fields: [cohortTable.measure],
      references: [measureTable.id],
    }),
  }));
};
