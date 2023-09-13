import { pgSchema, text, uuid } from "drizzle-orm/pg-core";

const slug = process.env.SLUG;

const fields = {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
};

export const schema = pgSchema(slug || "");
export const members = schema.table(`${slug}_members`, fields);

export const makeOrgSchema = (slug: string) => ({
  members: pgSchema(slug).table(`${slug}_members`, fields),
});
