import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const employerTable = pgTable("employer", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
  indeed: text("indeed"),
  stepstone: text("stepstone"),
  linkedin: text("linkedin"),
});
