import * as account from "./auth/account";
import * as session from "./auth/session";
import * as user from "./auth/user";
import * as verificationToken from "./auth/verification-token";

import {
  mkOrganizationTable,
  mkOrganizationTableRelations,
} from "../common/organization";

import * as employer from "../common/employer";
import * as job from "../common/job";
import * as skill from "../common/skill";
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
export const {
  skillTypeTable,
  skillCategoryTable,
  skillSubcategoryTable,
  skillTable,
  skillMissingTable,
} = skill;

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

  ...skill,
};
