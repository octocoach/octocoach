import { pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { schemaName } from "./helpers/naming";

const slug = process.env.SLUG ?? nanoid();

export const userColumns = {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
};

export const schema = pgSchema(schemaName(slug));
export const users = schema.table("user", userColumns);
