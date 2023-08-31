import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { skills } from "./skills";
import { users } from "./users";

export const skillLevel = pgEnum("skill_level", [
  "novice",
  "advanced_beginner",
  "competent",
  "proficient",
  "expert",
]);

export type SkillLevel = (typeof skillLevel.enumValues)[number];

export const usersSkillsLevels = pgTable(
  "users_skills_levels",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    skillId: text("skill_id")
      .notNull()
      .references(() => skills.id),
    skillLevel: skillLevel("skill_level").notNull(),
    created: timestamp("created").defaultNow(),
  },
  ({ skillId, userId }) => ({
    pk: primaryKey(skillId, userId),
  })
);

export const usersSkillsLevelsRelations = relations(
  usersSkillsLevels,
  ({ one }) => ({
    user: one(users, {
      fields: [usersSkillsLevels.userId],
      references: [users.id],
    }),
    skill: one(skills, {
      fields: [usersSkillsLevels.skillId],
      references: [skills.id],
    }),
  })
);

export type UsersSkillsLevels = InferSelectModel<typeof usersSkillsLevels>;
