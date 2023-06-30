import { InferModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { employers } from "./employers";

export const jobSource = pgEnum("job_source", ["indeed", "stepstone"]);

export const jobs = pgTable(
  "jobs",
  {
    source: jobSource("source").notNull(),
    id: varchar("id").notNull(),
    employer: varchar("employer")
      .notNull()
      .references(() => employers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    title: text("title"),
    descrtipion: text("description"),
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
