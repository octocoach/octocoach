import { relations } from "drizzle-orm";
import { mkUserCols } from "../common/user";
import { mkOrgPgSchema } from "./schema";
import { mkOrganizationTable } from "../common/organization";
import { mkUsersSkillLevelsTable } from "./users-skill-levels";
import { mkUsersTaskInterestTable } from "./users-task-interest";

export const mkOrgUserTable = (slug: string) =>
  mkOrgPgSchema(slug).table("user", mkUserCols());

export const mkOrgUserTableRelations = (slug: string) => {
  const orgUserTable = mkOrgUserTable(slug);
  const organizationTable = mkOrganizationTable(orgUserTable);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(slug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(slug);

  return relations(orgUserTable, ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [orgUserTable.id],
      references: [organizationTable.id],
    }),
    usersSkillLevels: many(usersSkillLevelsTable),
    usersTaskInterest: many(usersTaskInterestTable),
  }));
};
