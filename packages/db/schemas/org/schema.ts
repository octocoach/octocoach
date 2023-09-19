import { pgSchema } from "drizzle-orm/pg-core";
import { employerTable } from "../common/employer";
import { jobTable } from "../common/job";
import { mkOrganizationTable } from "../common/organization";
import {
  skillCategoryTable,
  skillSubcategoryTable,
  skillTable,
  skillTypeTable,
} from "../common/skill";
import { skillsTasksTable } from "../common/skills-tasks";
import { taskTable } from "../common/task";
import { mkOrgAccountTable } from "./auth/account";
import { mkOrgSessionTable } from "./auth/session";
import { mkOrgUserTable, mkOrgUserTableRelations } from "./auth/user";
import { mkOrgVerificationTokenTable } from "./auth/verification-token";

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
  skillCategoryTable,
  skillSubcategoryTable,
  skillTable,

  skillsTasksTable,
});
