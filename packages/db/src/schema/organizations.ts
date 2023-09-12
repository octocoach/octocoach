import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const organizations = pgTable("organization", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  owner: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const organizationsRelations = relations(organizations, ({ one }) => ({
  owner: one(users, {
    fields: [organizations.owner],
    references: [users.id],
  }),
}));
