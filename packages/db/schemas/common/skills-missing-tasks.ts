import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { skillMissingTable } from "./skill-missing";
import { taskTable } from "./task";

export type SkillMissing = typeof skillsMissingTasksTable.$inferSelect;
export type NewSkillMissing = typeof skillsMissingTasksTable.$inferInsert;

export const skillsMissingTasksTable = pgTable(
  "skills_missing_tasks",
  {
    skillMissingId: integer("skill_missing_id")
      .notNull()
      .references(() => skillMissingTable.id),
    taskId: integer("task_id")
      .notNull()
      .references(() => taskTable.id),
  },
  ({ skillMissingId, taskId }) => ({ pk: primaryKey(skillMissingId, taskId) })
);

export const skillsMissingTasksRelations = relations(
  skillsMissingTasksTable,
  ({ one }) => ({
    skillMissing: one(skillMissingTable, {
      fields: [skillsMissingTasksTable.skillMissingId],
      references: [skillMissingTable.id],
    }),
    task: one(taskTable, {
      fields: [skillsMissingTasksTable.taskId],
      references: [taskTable.id],
    }),
  })
);
