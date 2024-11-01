import * as address from "../common/address";
import * as employer from "../common/employer";
import * as job from "../common/job";
import {
  legalFormEnum,
  mkOrganizationTable,
  mkOrganizationTableRelations,
} from "../common/organization";
import * as skillCategory from "../common/skill-category";
import * as skillLevel from "../common/skill-level";
import * as skillMissing from "../common/skill-missing";
import * as skillSubcategory from "../common/skill-subcategory";
import * as skillType from "../common/skill-type";
import * as skillsMissingTasks from "../common/skills-missing-tasks";
import * as skillsTasks from "../common/skills-tasks";
import * as account from "./account";
import * as session from "./session";
import * as skill from "./skill";
import * as task from "./task";
import * as user from "./user";
import * as verificationToken from "./verification-token";

export const { accountTable } = account;
export const { sessionTable } = session;
export const { userTable, userTableRelations } = user;
export const { verificationTokenTable } = verificationToken;

export const organizationTable = mkOrganizationTable(userTable);
export const organizationTableRelations =
  mkOrganizationTableRelations(userTable);
export { legalFormEnum };
export const { addressTable, countryEnum } = address;

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
  legalFormEnum,
  organizationTable,
  organizationTableRelations,
  ...address,

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
