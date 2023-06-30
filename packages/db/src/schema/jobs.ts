import { InferModel, relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { employers } from "./employers";

export const jobSource = pgEnum("job_source", [
  "indeed",
  "stepstone",
  "linkedin",
]);

export const jobs = pgTable(
  "jobs",
  {
    source: jobSource("source").notNull(),
    id: text("id").notNull(),
    employer: integer("employer")
      .notNull()
      .references(() => employers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    title: text("title"),
    description: text("description"),
  },
  ({ source, id }) => ({
    pk: primaryKey(source, id),
  })
);

export const jobRelations = relations(jobs, ({ one }) => ({
  employer: one(employers, {
    fields: [jobs.employer],
    references: [employers.id],
  }),
}));

export const jobSchema = createInsertSchema(jobs);

export type Job = InferModel<typeof jobs>;
