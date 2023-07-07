import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { embedding } from "../embedding";
import { jobs } from "./jobs";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  job: integer("job")
    .notNull()
    .references(() => jobs.id),
  embedding: embedding("embedding"),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  job: one(jobs, {
    fields: [tasks.job],
    references: [jobs.id],
  }),
}));

export const selectTaskSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks);

export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, "insert">;
