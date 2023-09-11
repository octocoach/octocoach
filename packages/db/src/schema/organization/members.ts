import { pgSchema, uuid } from "drizzle-orm/pg-core";
import { argv } from "process";

const slug = argv[5];

if (!slug) {
  console.error("No slug provided");
}

const fields = {
  id: uuid("id").primaryKey().defaultRandom(),
};

export const schema = pgSchema(slug);

export const members = schema.table(`${slug}_members`, fields);

export const makeOrgSchema = (slug: string) => ({
  members: pgSchema(slug).table(`${slug}_members`, fields),
});
