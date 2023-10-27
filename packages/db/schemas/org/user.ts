import { relations } from "drizzle-orm";
import { mkOrganizationTable } from "../common/organization";
import { mkUserCols } from "../common/user";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserProfileTable } from "./user-profile";
import { mkUsersSkillLevelsTable } from "./users-skill-levels";
import { mkUsersTaskInterestTable } from "./users-task-interest";

export const mkUserTable = (slug: string) =>
  mkOrgPgSchema(slug).table("user", mkUserCols());

export const mkUserTableRelations = (slug: string) => {
  const userTable = mkUserTable(slug);
  const organizationTable = mkOrganizationTable(userTable);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(slug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(slug);
  const userProfileTable = mkUserProfileTable(slug);

  return relations(userTable, ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [userTable.id],
      references: [organizationTable.id],
    }),
    usersSkillLevels: many(usersSkillLevelsTable, {
      relationName: "userSkill",
    }),
    usersTaskInterest: many(usersTaskInterestTable, {
      relationName: "userTask",
    }),
    userProfile: one(userProfileTable, {
      fields: [userTable.id],
      references: [userProfileTable.userId],
    }),
  }));
};
