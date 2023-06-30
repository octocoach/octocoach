import { InferModel, relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";
import { createInsertSchema } from "drizzle-zod";

export const employers = pgTable("employers", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
});

export const employerRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs),
}));

export const employerSchema = createInsertSchema(employers, {
  url: ({ url }) => url.url(),
});

export type Employer = InferModel<typeof employers>;
