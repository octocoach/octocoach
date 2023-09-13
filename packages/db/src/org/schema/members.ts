import { pgSchema, text, uuid } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { schemaName, tableName } from "../../helpers/naming";

const slug = process.env.SLUG ?? nanoid();

export const memberColumns = {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
};

export const schema = pgSchema(schemaName(slug));
export const members = schema.table(tableName(slug, "members"), memberColumns);
