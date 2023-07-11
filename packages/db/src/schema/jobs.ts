import { InferModel, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { companies } from "./companies";
import { tasks } from "./tasks";
import { embedding } from "../embedding";

export const jobSource = pgEnum("job_source", [
  "indeed",
  "stepstone",
  "linkedin",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  source: jobSource("source").notNull(),
  sourceId: text("source_id"),
  company: integer("company")
    .notNull()
    .references(() => companies.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title").notNull(),
  titleEmbedding: embedding("title_embedding").notNull(),
  description: text("description").notNull(),
  descriptionEmbedding: embedding("description_embedding").notNull(),
});

export const jobRelations = relations(jobs, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobs.company],
    references: [companies.id],
  }),
  tasks: many(tasks),
}));

export const jobSchema = createInsertSchema(jobs);

export type Job = InferModel<typeof jobs>;

export type NewJob = InferModel<typeof jobs, "insert">;
