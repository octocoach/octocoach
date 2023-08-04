import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { skills } from "./skills";
import { relations } from "drizzle-orm";

export const usersSkillsLevels = pgTable(
  "users_skills_levels",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    skillId: text("skill_id")
      .notNull()
      .references(() => skills.id),
    level: integer("level").notNull(),
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
