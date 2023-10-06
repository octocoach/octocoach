import { pgSchema } from "drizzle-orm/pg-core";
import { employerTable } from "../common/employer";
import { jobTable } from "../common/job";
import {
  mkOrganizationTable,
  mkOrganizationTableRelations,
} from "../common/organization";
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
  skillsMissingTasksRelations,
  skillsMissingTasksTable,
} from "../common/skills-missing-tasks";
import { skillsTasksRelations, skillsTasksTable } from "../common/skills-tasks";
import { mkOrgAccountTable } from "./account";
import { mkOrgSessionTable } from "./session";
import { mkSkillRelations, skillTable } from "./skill";
import { mkTaskRelations, taskTable } from "./task";
import { mkUserTable, mkUserTableRelations } from "./user";
import { mkUserProfileTable, mkUserProfileRelations } from "./user-profile";
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

  userTable: mkUserTable(slug),
  userTableRelations: mkUserTableRelations(slug),

  verificationTokenTable: mkOrgVerificationTokenTable(slug),

  // common
  userProfileTable: mkUserProfileTable(slug),
  userProfileRelations: mkUserProfileRelations(slug),

  organizationTable: mkOrganizationTable(mkUserTable(slug)),
  organizationTableRelations: mkOrganizationTableRelations(mkUserTable(slug)),

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
