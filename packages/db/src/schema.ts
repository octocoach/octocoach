import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Skill Types

export const skillTypes = pgTable("skill_types", {
  id: varchar("id", { length: 3 }).primaryKey(),
  name: text("name").notNull(),
});

export type SkillType = InferModel<typeof skillTypes>;

export const insertSkillTypeSchema = createInsertSchema(skillTypes);
export const selectSkillTypeSchema = createSelectSchema(skillTypes);

// Skill Categories

export const skillCategories = pgTable("skill_categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const skillCategoriesRelations = relations(
  skillCategories,
  ({ many }) => ({
    subcategories: many(skillSubcategories),
  })
);

export type SkillCategory = InferModel<typeof skillCategories>;
export const skillCategorySchema = createInsertSchema(skillCategories);

// Skill Subcategories

export const skillSubcategories = pgTable("skill_subcategories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  category: integer("category")
    .notNull()
    .references(() => skillCategories.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
});

export const skillSubcategoriesRelations = relations(
  skillSubcategories,
  ({ one }) => ({
    category: one(skillCategories, {
      fields: [skillSubcategories.category],
      references: [skillCategories.id],
    }),
  })
);

export type SkillSubcategory = InferModel<typeof skillSubcategories>;
export const skillSubcategorySchema = createInsertSchema(skillSubcategories);
