import { relations } from "drizzle-orm";
import { taskTable } from "../common/task";
import { jobTable } from "../common/job";
import { skillsTasksTable } from "../common/skills-tasks";
import { skillsMissingTasksTable } from "../common/skills-missing-tasks";
import { mkUsersTaskInterestTable } from "./users-task-interest";

export { taskTable };
export const mkTaskRelations = (slug: string) => {
  const usersTaskInterestTable = mkUsersTaskInterestTable(slug);

  return relations(taskTable, ({ one, many }) => ({
    job: one(jobTable, {
      fields: [taskTable.jobId],
      references: [jobTable.id],
    }),
    skillsTasks: many(skillsTasksTable),
    skillsMissingTasks: many(skillsMissingTasksTable),
    usersTaskInterest: many(usersTaskInterestTable),
  }));
};
