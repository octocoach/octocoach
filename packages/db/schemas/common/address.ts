import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export type Address = typeof addressTable.$inferSelect;
export type NewAddress = typeof addressTable.$inferInsert;

export const countryEnum = pgEnum("country", ["de"]);

export const addressTable = pgTable("address", {
  id: serial("id").notNull().primaryKey(),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  state: text("state").notNull(),
  country: countryEnum("country").notNull(),
});
