import { pgSchema, text, uuid } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const schemaName = (slug: string) => `org_${slug}`;
const tableName = (slug: string, name: string) => `${slug}_${name}`;

const slug = process.env.SLUG ?? nanoid();

const fields = {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
};

export const schema = pgSchema(schemaName(slug));
export const members = schema.table(`${slug}_members`, fields);

export const makeOrgSchema = (slug: string) => ({
  members: pgSchema(schemaName(slug)).table(tableName(slug, "members"), fields),
});
