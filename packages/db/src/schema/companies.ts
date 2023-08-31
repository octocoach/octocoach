import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { jobs } from "./jobs";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
  indeed: text("indeed"),
  stepstone: text("stepstone"),
  linkedin: text("linkedin"),
});

export const employerRelations = relations(companies, ({ many }) => ({
  jobs: many(jobs),
}));

export const employerInsertSchema = createInsertSchema(companies, {
  url: ({ url }) => url.url(),
});

export const employerSelectSchema = createSelectSchema(companies);

export type Company = InferSelectModel<typeof companies>;
export type NewCompany = InferInsertModel<typeof companies>;
