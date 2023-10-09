import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export type Address = typeof addressTable.$inferSelect;
export type NewAddress = typeof addressTable.$inferInsert;

export const countryEnum = pgEnum("country", ["de"]);

export const addressTable = pgTable("address", {
  id: serial("id").notNull().primaryKey(),
  country: countryEnum("country").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  street: text("street").notNull(),
  housenumber: text("housenumber").notNull(),
});
