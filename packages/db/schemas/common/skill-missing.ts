import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { embedding } from "../data-types/embedding";
import { skillsMissingTasksTable } from "./skills-missing-tasks";

export const skillMissingTable = pgTable("skill_missing", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  embedding: embedding("embedding").notNull(),
  created: timestamp("created").notNull().defaultNow(),
});

export type NewSkillMissing = typeof skillMissingTable.$inferInsert;
export type SkillMissing = typeof skillMissingTable.$inferSelect;

export const skillMissingRelations = relations(
  skillMissingTable,
  ({ many }) => ({
    skillsMissingTasks: many(skillsMissingTasksTable),
  })
);
