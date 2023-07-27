import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { embedding } from "../embedding";
import { jobs } from "./jobs";
import { tasksToSkills } from "./tasks-to-skills";
import { tasksToSkillsMissing } from "./tasks-to-skills-missing";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id),
  embedding: embedding("embedding"),
});

export const taskRelations = relations(tasks, ({ one, many }) => ({
  job: one(jobs, {
    fields: [tasks.jobId],
    references: [jobs.id],
  }),
  tasksToSkills: many(tasksToSkills),
  tasksToSkillsMissing: many(tasksToSkillsMissing),
}));

export const selectTaskSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks);

export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, "insert">;
