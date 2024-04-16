import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

import { skillTable } from "./skill";
import { taskTable } from "./task";

export type SkillsTasks = typeof skillsTasksTable.$inferSelect;
export type NewSkillsTasks = typeof skillsTasksTable.$inferInsert;

export const skillsTasksTable = pgTable(
  "skills_tasks",
  {
    skillId: text("skill_id")
      .notNull()
      .references(() => skillTable.id),
    taskId: integer("task_id")
      .notNull()
      .references(() => taskTable.id),
  },
  ({ skillId, taskId }) => ({ pk: primaryKey(skillId, taskId) })
);

export const skillsTasksRelations = relations(skillsTasksTable, ({ one }) => ({
  skill: one(skillTable, {
    fields: [skillsTasksTable.skillId],
    references: [skillTable.id],
  }),
  task: one(taskTable, {
    fields: [skillsTasksTable.taskId],
    references: [taskTable.id],
  }),
}));
