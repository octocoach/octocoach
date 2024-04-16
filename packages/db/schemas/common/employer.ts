import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

import { jobTable } from "./job";

export const employerTable = pgTable("employer", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
  indeed: text("indeed"),
  stepstone: text("stepstone"),
  linkedin: text("linkedin"),
});

export const employerRelations = relations(employerTable, ({ many }) => ({
  jobs: many(jobTable),
}));

export type Employer = typeof employerTable.$inferSelect;
export type NewEmployer = typeof employerTable.$inferInsert;
