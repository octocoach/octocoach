import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { skillMissingTable } from "./skill";
import { taskTable } from "./task";

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
