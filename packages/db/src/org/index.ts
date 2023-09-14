import { pgSchema } from "drizzle-orm/pg-core";
import { schemaName, tableName } from "./schema/helpers/naming";
import { memberColumns } from "./schema/members";
import { userColumns } from "./schema/users";

export const makeOrgSchema = (slug: string) => {
  const { table } = pgSchema(schemaName(slug));
  return {
    members: table(tableName(slug, "members"), memberColumns),
    users: table("user", userColumns),
  };
};
