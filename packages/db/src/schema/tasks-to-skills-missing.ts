import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { skillsMissing } from "./skills";
import { tasks } from "./tasks";

export const tasksToSkillsMissing = pgTable(
  "tasks_to_skills_missing",
  {
    taskId: integer("task_id")
      .notNull()
      .references(() => tasks.id),
    skillMissingId: integer("skill_missing_id")
      .notNull()
      .references(() => skillsMissing.id),
  },
  ({ taskId, skillMissingId }) => ({
    pk: primaryKey(taskId, skillMissingId),
  })
);

export const tasksToSkillsMissingRelations = relations(
  tasksToSkillsMissing,
  ({ one }) => ({
    task: one(tasks, {
      fields: [tasksToSkillsMissing.taskId],
      references: [tasks.id],
    }),
    skill: one(skillsMissing, {
      fields: [tasksToSkillsMissing.skillMissingId],
      references: [skillsMissing.id],
    }),
  })
);

export const tasksToSkillsMissingSchema =
  createInsertSchema(tasksToSkillsMissing);

export type TasksToSkillsMissing = InferSelectModel<
  typeof tasksToSkillsMissing
>;
