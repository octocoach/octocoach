import { InferModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersTasksInterest } from "./users-tasks-interest";
import { usersSkillsLevels } from "./users-skills-levels";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
});

export const userRelations = relations(users, ({ many }) => ({
  usersTasksInterest: many(usersTasksInterest),
  usersSkillsLevels: many(usersSkillsLevels),
}));

export type User = InferModel<typeof users>;

export const userSchema = createInsertSchema(users);
