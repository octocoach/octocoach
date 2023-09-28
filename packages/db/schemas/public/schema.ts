import * as account from "./account";
import * as session from "./session";
import * as user from "./user";
import * as verificationToken from "./verification-token";

import {
  mkOrganizationTable,
  mkOrganizationTableRelations,
} from "../common/organization";

import * as employer from "../common/employer";
import * as job from "../common/job";

import * as skillLevel from "../common/skill-level";
import * as skillType from "../common/skill-type";
import * as skillCategory from "../common/skill-category";
import * as skillSubcategory from "../common/skill-subcategory";
import * as skill from "../common/skill";
import * as skillMissing from "../common/skill-missing";
import * as skillsMissingTasks from "../common/skills-missing-tasks";
import * as skillsTasks from "../common/skills-tasks";

import * as task from "../common/task";

export const { accountTable } = account;
export const { sessionTable } = session;
export const { userTable, userTableRelations } = user;
export const { verificationTokenTable } = verificationToken;

export const organizationTable = mkOrganizationTable(userTable);
export const organizationTableRelations =
  mkOrganizationTableRelations(userTable);

export const { employerTable } = employer;
export const { jobTable, jobSourceEnum } = job;
export const { taskTable } = task;

export const { skillLevelEnum } = skillLevel;
export const { skillTypeTable, skillTypeRelations } = skillType;
export const { skillCategoryTable, skillCategoryRelations } = skillCategory;
export const { skillSubcategoryTable, skillSubcategoryRelations } =
  skillSubcategory;
export const { skillTable, skillRelations } = skill;
export const { skillMissingTable, skillMissingRelations } = skillMissing;
export const { skillsMissingTasksTable } = skillsMissingTasks;
export const { skillsTasksTable } = skillsTasks;

export const publicSchema = {
  // auth
  ...account,

  ...session,

  ...user,

  ...verificationToken,

  // common
  organizationTable,
  organizationTableRelations,

  ...employer,

  ...job,

  ...task,

  ...skillLevel,
  ...skillType,
  ...skillCategory,
  ...skillSubcategory,
  ...skill,
  ...skillMissing,

  ...skillsTasks,
  ...skillsMissingTasks,
};
