import { pgSchema } from "drizzle-orm/pg-core";
import { employerTable } from "../common/employer";
import { jobTable } from "../common/job";
import { mkOrganizationTable } from "../common/organization";

import { skillsTasksTable } from "../common/skills-tasks";
import { taskTable } from "../common/task";
import { mkOrgAccountTable } from "./account";
import { mkOrgSessionTable } from "./session";
import { mkOrgUserTable, mkOrgUserTableRelations } from "./user";
import { mkOrgVerificationTokenTable } from "./verification-token";
import { skillsMissingTasksTable } from "../common/skills-missing-tasks";
import {
  mkUsersSkillLevelsTable,
  mkUsersSkillLevelsRelations,
} from "./users-skill-levels";
import { skillTypeTable, skillTypeRelations } from "../common/skill-type";
import {
  skillCategoryTable,
  skillCategoryRelations,
} from "../common/skill-category";
import {
  skillSubcategoryTable,
  skillSubcategoryRelations,
} from "../common/skill-subcategory";
import { skillTable, skillRelations } from "../common/skill";
import {
  skillMissingTable,
  skillMissingRelations,
} from "../common/skill-missing";
import {
  mkUsersTaskInterestRelations,
  mkUsersTaskInterestTable,
} from "./users-task-interest";

export const mkOrgPgSchema = (slug: string) => pgSchema(`org_${slug}`);

export const mkOrgSchema = (slug: string) => ({
  // auth
  accountTable: mkOrgAccountTable(slug),

  sessionTable: mkOrgSessionTable(slug),

  userTable: mkOrgUserTable(slug),
  userTableRelations: mkOrgUserTableRelations(slug),

  verificationTokenTable: mkOrgVerificationTokenTable(slug),

  // common
  organizationTable: mkOrganizationTable(mkOrgUserTable(slug)),
  organizationTableRelations: mkOrgUserTableRelations(slug),

  employerTable,

  jobTable,

  taskTable,

  skillTypeTable,
  skillTypeRelations,
  skillCategoryTable,
  skillCategoryRelations,
  skillSubcategoryTable,
  skillSubcategoryRelations,
  skillTable,
  skillRelations,
  skillMissingTable,
  skillMissingRelations,

  skillsTasksTable,
  skillsMissingTasksTable,

  // org
  usersSkillLevelsTable: mkUsersSkillLevelsTable(slug),
  usersSkillLevelsRelations: mkUsersSkillLevelsRelations(slug),

  usersTaskInterestTable: mkUsersTaskInterestTable(slug),
  usersTaskInterestRelations: mkUsersTaskInterestRelations(slug),
});
