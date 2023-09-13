import { pgSchema } from "drizzle-orm/pg-core";
import { schemaName, tableName } from "../helpers/naming";
import { memberColumns } from "./schema/members";

export const makeOrgSchema = (slug: string) => ({
  members: pgSchema(schemaName(slug)).table(
    tableName(slug, "members"),
    memberColumns
  ),
});
