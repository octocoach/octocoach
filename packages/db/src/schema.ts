import * as companies from "./schema/companies";
import * as jobs from "./schema/jobs";
import * as organizations from "./schema/organizations";
import * as skills from "./schema/skills";
import * as tasks from "./schema/tasks";
import * as tasksToSkills from "./schema/tasks-to-skills";
import * as users from "./schema/users";
import * as usersTasksInterest from "./schema/users-tasks-interest";
import * as usersSkillsLevels from "./schema/users-skills-levels";

export default {
  ...companies,
  ...jobs,
  ...organizations,
  ...skills,
  ...tasks,
  ...tasksToSkills,
  ...users,
  ...usersTasksInterest,
  ...usersSkillsLevels,
};
