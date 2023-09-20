import { pgSchema, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const mkUserCols = () => ({
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

const _userTable = pgTable("user", mkUserCols());
export type UserTable = typeof _userTable;

const _orgUserTable = pgSchema("slug" as string).table("user", mkUserCols());
export type OrgUserTable = typeof _orgUserTable;
