import { relations } from "drizzle-orm";
import { jobTable } from "../common/job";
import { skillsMissingTasksTable } from "../common/skills-missing-tasks";
import { skillsTasksTable } from "../common/skills-tasks";
import { taskTable } from "../common/task";

export { taskTable };
export const taskRelations = relations(taskTable, ({ one, many }) => ({
  job: one(jobTable, {
    fields: [taskTable.jobId],
    references: [jobTable.id],
  }),
  skillsTasks: many(skillsTasksTable),
  skillsMissingTasks: many(skillsMissingTasksTable),
}));
