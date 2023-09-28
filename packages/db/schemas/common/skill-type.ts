import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { skillTable } from "./skill";

export type SkillType = typeof skillTypeTable.$inferSelect;
export type NewSkillType = typeof skillTypeTable.$inferInsert;

export const skillTypeTable = pgTable("skill_type", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const skillTypeRelations = relations(skillTypeTable, ({ many }) => ({
  skills: many(skillTable),
}));
