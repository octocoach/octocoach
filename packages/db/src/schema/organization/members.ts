import { pgSchema, text, uuid } from "drizzle-orm/pg-core";
import { argv } from "process";

const slug = argv[5];

const fields = {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
};

export const schema = pgSchema(slug);

export const members = schema.table(`${slug}_members`, fields);

export const makeOrgSchema = (slug: string) => ({
  members: pgSchema(slug).table(`${slug}_members`, fields),
});
