import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { organizations } from "./organization";

export const coaches = pgTable("coaches", {
  id: text("id")
    .primaryKey()
    .references(() => users.id),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id),
});
