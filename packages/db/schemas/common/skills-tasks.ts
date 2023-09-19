import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { skillTable } from "./skill";
import { taskTable } from "./task";

export const skillsTasksTable = pgTable(
  "skills_tasks",
  {
    skillId: text("skill_id")
      .notNull()
      .references(() => skillTable.id),
    taskId: text("task_id")
      .notNull()
      .references(() => taskTable.id),
  },
  ({ skillId, taskId }) => ({ pk: primaryKey(skillId, taskId) })
);
