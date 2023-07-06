import { InferModel, relations } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { vector } from "../vector";

// Skill Types

export const skillTypes = pgTable("skill_types", {
  id: text("id").primaryKey(),
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

// Skills

export const skills = pgTable("skills", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameEmbedding: vector("name_embedding", { dimensions: 1536 }).notNull(),
  infoUrl: text("info_url"),
  isSoftware: boolean("is_software").notNull(),
  isLanguage: boolean("is_language").notNull(),
  description: text("description"),
  descriptionEmbedding: vector("description_embedding", { dimensions: 1536 }),
  subcategory: integer("subcategory")
    .notNull()
    .references(() => skillSubcategories.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  type: text("type")
    .notNull()
    .references(() => skillTypes.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
});

export const skillRelations = relations(skills, ({ one }) => ({
  subcategory: one(skillSubcategories, {
    fields: [skills.subcategory],
    references: [skillSubcategories.id],
  }),
  type: one(skillTypes, {
    fields: [skills.type],
    references: [skillTypes.id],
  }),
}));

export type Skill = InferModel<typeof skills>;
export const skillSchema = createInsertSchema(skills);
