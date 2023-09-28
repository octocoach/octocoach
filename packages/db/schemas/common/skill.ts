import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";
import { skillsTasksTable } from "./skills-tasks";
import { skillSubcategoryTable } from "./skill-subcategory";
import { skillTypeTable } from "./skill-type";

export type NewSkill = typeof skillTable.$inferInsert;
export type Skill = typeof skillTable.$inferSelect;

export const skillTable = pgTable("skill", {
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
    .references(() => skillSubcategoryTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  typeId: text("type_id")
    .notNull()
    .references(() => skillTypeTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  aliases: text("aliases").array(),
});

export const skillRelations = relations(skillTable, ({ one, many }) => ({
  subcategory: one(skillSubcategoryTable, {
    fields: [skillTable.subcategoryId],
    references: [skillSubcategoryTable.id],
  }),
  type: one(skillTypeTable, {
    fields: [skillTable.typeId],
    references: [skillTypeTable.id],
  }),

  skillsTasks: many(skillsTasksTable),
}));
