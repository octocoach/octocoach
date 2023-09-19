import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { embedding } from "../../data-types/embedding";
import { jobTable } from "./job";

export const taskTable = pgTable("task", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  question: text("question").notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobTable.id),
  embedding: embedding("embedding"),
});
