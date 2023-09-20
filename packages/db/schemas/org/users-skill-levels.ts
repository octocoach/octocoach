import { pgEnum, timestamp } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "./schema";
import { mkOrgUserTable } from "./user";
import { text } from "drizzle-orm/pg-core";
import { skillTable } from "../common/skill";
import { relations } from "drizzle-orm";

export const skillLevelEnum = pgEnum("skill_level", [
  "novice",
  "advanced_beginner",
  "competent",
  "proficient",
  "expert",
]);

export type SkillLevel = (typeof skillLevelEnum.enumValues)[number];

export const mkUsersSkillLevelsTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const orgUserTable = mkOrgUserTable(slug);

  return table("users_skill_levels", {
    userId: text("user_id")
      .notNull()
      .references(() => orgUserTable.id),
    skillId: text("skill_id")
      .notNull()
      .references(() => skillTable.id),
    skillLevel: skillLevelEnum("skill_level").notNull(),
    created: timestamp("created").defaultNow(),
  });
};

export const mkUsersSkillLevelsTableRelations = (slug: string) => {
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(slug);
  const orgUserTable = mkOrgUserTable(slug);

  return relations(usersSkillLevelsTable, ({ one }) => ({
    user: one(orgUserTable, {
      fields: [usersSkillLevelsTable.userId],
      references: [orgUserTable.id],
    }),
    skill: one(skillTable, {
      fields: [usersSkillLevelsTable.skillId],
      references: [skillTable.id],
    }),
  }));
};
