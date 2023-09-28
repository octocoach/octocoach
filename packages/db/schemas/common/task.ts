import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";
import { jobTable } from "./job";
import { relations } from "drizzle-orm";
import { skillsTasksTable } from "./skills-tasks";
import { skillsMissingTasksTable } from "./skills-missing-tasks";

export type Task = typeof taskTable.$inferSelect;
export type NewTask = typeof taskTable.$inferInsert;

export const taskTable = pgTable("task", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  question: text("question").notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobTable.id),
  embedding: embedding("embedding"),
});

export const taskRelations = relations(taskTable, ({ one, many }) => ({
  job: one(jobTable, {
    fields: [taskTable.jobId],
    references: [jobTable.id],
  }),
  skillsTasks: many(skillsTasksTable),
  skillsMissingTasks: many(skillsMissingTasksTable),
}));
