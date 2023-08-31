import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { embedding } from "../embedding";
import { companies } from "./companies";
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
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title").notNull(),
  titleEmbedding: embedding("title_embedding").notNull(),
  description: text("description").notNull(),
  descriptionEmbedding: embedding("description_embedding").notNull(),
  location: text("location"),
  created: timestamp("created").notNull().defaultNow(),
});

export const jobRelations = relations(jobs, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  tasks: many(tasks),
}));

export const jobSchema = createInsertSchema(jobs);

export type Job = InferSelectModel<typeof jobs>;

export type NewJob = InferInsertModel<typeof jobs>;
