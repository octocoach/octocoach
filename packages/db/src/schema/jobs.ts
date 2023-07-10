import { InferModel, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { employers } from "./employers";
import { tasks } from "./tasks";

export const jobSource = pgEnum("job_source", [
  "indeed",
  "stepstone",
  "linkedin",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  source: jobSource("source").notNull(),
  sourceId: text("source_id"),
  employer: integer("employer")
    .notNull()
    .references(() => employers.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title"),
  description: text("description").notNull(),
});

export const jobRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.employer],
    references: [employers.id],
  }),
  tasks: many(tasks),
}));

export const jobSchema = createInsertSchema(jobs);

export type Job = InferModel<typeof jobs>;

export type NewJob = InferModel<typeof jobs, "insert">;
