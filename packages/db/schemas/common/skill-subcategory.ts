import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { skillTable } from "./skill";
import { skillCategoryTable } from "./skill-category";

export type SkillSubcategory = typeof skillSubcategoryTable.$inferSelect;
export type NewSkillSubcategory = typeof skillSubcategoryTable.$inferInsert;

export const skillSubcategoryTable = pgTable("skill_subcategory", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => skillCategoryTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
});

export const skillSubcategoryRelations = relations(
  skillSubcategoryTable,
  ({ many, one }) => ({
    skills: many(skillTable),
    category: one(skillCategoryTable, {
      fields: [skillSubcategoryTable.categoryId],
      references: [skillCategoryTable.id],
    }),
  })
);
