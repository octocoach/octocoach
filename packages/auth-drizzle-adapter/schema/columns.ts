import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userColumns = {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
};
