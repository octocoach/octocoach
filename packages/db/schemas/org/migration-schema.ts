import { mkOrgPgSchema } from "../common/pg-schema";
import { mkOrgSchema } from "./schema";

const slug = "{slug}";

export const orgPgSchema = mkOrgPgSchema(slug);

export const {
  accountTable,
  coachTable,
  coachTableRelations,
  contentLocaleTable,
  contentTable,
  localeEnum,
  measureInfoRelations,
  measureInfoTable,
  measureModuleRelations,
  measureModuleTable,
  measureRelations,
  measureTable,
  moduleInfoRelations,
  moduleInfoTable,
  moduleRelations,
  moduleTable,
  sessionTable,
  userProfileRelations,
  userProfileTable,
  usersSkillLevelsRelations,
  usersSkillLevelsTable,
  usersTaskInterestRelations,
  usersTaskInterestTable,
  userTable,
  userTableRelations,
  verificationTokenTable,
} = mkOrgSchema(slug);
