import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";
import { employerTable } from "./employer";

export const jobSourceEnum = pgEnum("job_source", [
  "indeed",
  "stepstone",
  "linkedin",
]);

export const jobTable = pgTable("job", {
  id: serial("id").primaryKey(),
  source: jobSourceEnum("source").notNull(),
  sourceId: text("source_id"),
  employerId: integer("employer_id")
    .notNull()
    .references(() => employerTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title").notNull(),
  titleEmbedding: embedding("title_embedding").notNull(),
  description: text("description").notNull(),
  descriptionEmbedding: embedding("description_embedding").notNull(),
  location: text("location"),
  created: timestamp("created").notNull().defaultNow(),
});
