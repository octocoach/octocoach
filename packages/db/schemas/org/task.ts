import { relations } from "drizzle-orm";

import { jobTable } from "../common/job";
import { skillsMissingTasksTable } from "../common/skills-missing-tasks";
import { skillsTasksTable } from "../common/skills-tasks";
import { taskTable } from "../common/task";
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
    usersTaskInterest: many(usersTaskInterestTable, {
      relationName: "taskUser",
    }),
  }));
};
