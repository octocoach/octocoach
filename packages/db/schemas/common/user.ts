import { pgSchema, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const mkUserCols = () => ({
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

const userTable = pgTable("user", mkUserCols());
export type UserTable = typeof userTable;

const orgUserTable = pgSchema("slug" as string).table("user", mkUserCols());
export type OrgUserTable = typeof orgUserTable;
