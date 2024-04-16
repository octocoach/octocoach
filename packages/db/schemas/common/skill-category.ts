import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { skillSubcategoryTable } from "./skill-subcategory";

export const skillCategoryTable = pgTable("skill_category", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export type SkillCategory = typeof skillCategoryTable.$inferSelect;
export type NewSkillCategory = typeof skillCategoryTable.$inferInsert;

export const skillCategoryRelations = relations(
  skillCategoryTable,
  ({ many }) => ({
    subcategories: many(skillSubcategoryTable),
  })
);
