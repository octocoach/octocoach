import { InferModel, relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { jobs } from "./jobs";

export const employers = pgTable("employers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
  indeed: text("indeed"),
  stepstone: text("stepstone"),
  linkedin: text("linkedin"),
});

export const employerRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs),
}));

export const employerInsertSchema = createInsertSchema(employers, {
  url: ({ url }) => url.url(),
});

export const employerSelectSchema = createSelectSchema(employers);

export type Employer = InferModel<typeof employers>;
export type NewEmployer = InferModel<typeof employers, "insert">;
