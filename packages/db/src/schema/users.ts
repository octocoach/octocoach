import { InferSelectModel, or, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersSkillsLevels } from "./users-skills-levels";
import { usersTasksInterest } from "./users-tasks-interest";
import { organizations } from "./organizations";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  summary: text("summary"),
  summaryHash: text("summary_hash"),
});

export const userRelations = relations(users, ({ one, many }) => ({
  usersTasksInterest: many(usersTasksInterest),
  usersSkillsLevels: many(usersSkillsLevels),
  organization: one(organizations, {
    fields: [users.id],
    references: [organizations.owner],
  }),
}));

export type User = InferSelectModel<typeof users>;

export const userSchema = createInsertSchema(users);
