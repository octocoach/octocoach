import { InferModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { embedding } from "../embedding";
import { tasksToSkills } from "./tasks-to-skills";
import { type } from "os";
import { tasksToSkillsMissing } from "./tasks-to-skills-missing";

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
  categoryId: integer("category_id")
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
      fields: [skillSubcategories.categoryId],
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
  nameEmbedding: embedding("name_embedding").notNull(),
  infoUrl: text("info_url"),
  isSoftware: boolean("is_software").notNull(),
  isLanguage: boolean("is_language").notNull(),
  description: text("description"),
  descriptionEmbedding: embedding("description_embedding"),
  subcategoryId: integer("subcategory_id")
    .notNull()
    .references(() => skillSubcategories.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  typeId: text("type_id")
    .notNull()
    .references(() => skillTypes.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  aliases: text("aliases").array(),
});

export const skillRelations = relations(skills, ({ one, many }) => ({
  subcategory: one(skillSubcategories, {
    fields: [skills.subcategoryId],
    references: [skillSubcategories.id],
  }),
  type: one(skillTypes, {
    fields: [skills.typeId],
    references: [skillTypes.id],
  }),
  tasksToSkills: many(tasksToSkills),
}));

export type Skill = InferModel<typeof skills>;
export const skillSchema = createInsertSchema(skills);

// Missing Skills

export const skillsMissing = pgTable("skills_missing", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  embedding: embedding("embedding").notNull(),
  created: timestamp("created").notNull().defaultNow(),
});

export const skillMissingRelations = relations(skillsMissing, ({ many }) => ({
  tasksToSkillsMissing: many(tasksToSkillsMissing),
}));

export type SkillsMissing = InferModel<typeof skillsMissing>;
export const skillsMissingSchema = createSelectSchema(skillsMissing);
export const newSkillsMissingSchema = createInsertSchema(skillsMissing);
