import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";

export const skillTypeTable = pgTable("skill_type", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const skillCategoryTable = pgTable("skill_category", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

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

export const skillMissingTable = pgTable("skill_missing", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  embedding: embedding("embedding").notNull(),
  created: timestamp("created").notNull().defaultNow(),
});
