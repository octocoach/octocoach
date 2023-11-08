import { mkOrgPgSchema } from "../common/pg-schema";
import { mkOrgSchema } from "./schema";

const slug = process.env.SLUG as string;

export const orgPgSchema = mkOrgPgSchema(slug);

export const {
  accountTable,
  coachTable,
  coachTableRelations,
  contentLocaleTable,
  contentTable,
  localeEnum,
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
