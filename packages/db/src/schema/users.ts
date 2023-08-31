import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersSkillsLevels } from "./users-skills-levels";
import { usersTasksInterest } from "./users-tasks-interest";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  summary: text("summary"),
  summaryHash: text("summary_hash"),
});

export const userRelations = relations(users, ({ many }) => ({
  usersTasksInterest: many(usersTasksInterest),
  usersSkillsLevels: many(usersSkillsLevels),
}));

export type User = InferSelectModel<typeof users>;

export const userSchema = createInsertSchema(users);
