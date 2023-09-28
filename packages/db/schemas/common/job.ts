import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";
import { employerTable } from "./employer";
import { relations } from "drizzle-orm";
import { taskTable } from "./task";

export const jobSourceEnum = pgEnum("job_source", [
  "indeed",
  "stepstone",
  "linkedin",
]);

export const jobTable = pgTable("job", {
  id: serial("id").primaryKey(),
  source: jobSourceEnum("source").notNull(),
  sourceId: text("source_id"),
  employerId: integer("employer_id")
    .notNull()
    .references(() => employerTable.id, {
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

export type NewJob = typeof jobTable.$inferInsert;
export type Job = typeof jobTable.$inferSelect;

export const jobRelations = relations(jobTable, ({ one, many }) => ({
  employer: one(employerTable, {
    fields: [jobTable.employerId],
    references: [employerTable.id],
  }),
  tasks: many(taskTable),
}));
