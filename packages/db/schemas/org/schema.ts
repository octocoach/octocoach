import { pgSchema } from "drizzle-orm/pg-core";
import { employerTable } from "../common/employer";
import { jobTable } from "../common/job";
import { mkOrganizationTable } from "../common/organization";

import { mkSkillRelations, skillTable } from "./skill";
import {
  skillCategoryRelations,
  skillCategoryTable,
} from "../common/skill-category";
import {
  skillMissingRelations,
  skillMissingTable,
} from "../common/skill-missing";
import {
  skillSubcategoryRelations,
  skillSubcategoryTable,
} from "../common/skill-subcategory";
import { skillTypeRelations, skillTypeTable } from "../common/skill-type";
import {
  skillsMissingTasksTable,
  skillsMissingTasksRelations,
} from "../common/skills-missing-tasks";
import { skillsTasksTable, skillsTasksRelations } from "../common/skills-tasks";
import { mkOrgAccountTable } from "./account";
import { mkOrgSessionTable } from "./session";
import { mkTaskRelations, taskTable } from "./task";
import { mkOrgUserTable, mkOrgUserTableRelations } from "./user";
import {
  mkUsersSkillLevelsRelations,
  mkUsersSkillLevelsTable,
} from "./users-skill-levels";
import {
  mkUsersTaskInterestRelations,
  mkUsersTaskInterestTable,
} from "./users-task-interest";
import { mkOrgVerificationTokenTable } from "./verification-token";

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
  taskRelations: mkTaskRelations(slug),

  skillTypeTable,
  skillTypeRelations,
  skillCategoryTable,
  skillCategoryRelations,
  skillSubcategoryTable,
  skillSubcategoryRelations,
  skillTable,
  skillRelations: mkSkillRelations(slug),
  skillMissingTable,
  skillMissingRelations,

  skillsTasksTable,
  skillsTasksRelations,
  skillsMissingTasksTable,
  skillsMissingTasksRelations,

  // org
  usersSkillLevelsTable: mkUsersSkillLevelsTable(slug),
  usersSkillLevelsRelations: mkUsersSkillLevelsRelations(slug),

  usersTaskInterestTable: mkUsersTaskInterestTable(slug),
  usersTaskInterestRelations: mkUsersTaskInterestRelations(slug),
});
