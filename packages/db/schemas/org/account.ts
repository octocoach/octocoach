import { primaryKey } from "drizzle-orm/pg-core";

import { mkAccountCols } from "../common/account";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";

export const mkOrgAccountTable = (slug: string) =>
  mkOrgPgSchema(slug).table(
    "account",
    mkAccountCols(mkUserTable(slug)),
    (table) => ({
      pk: primaryKey(table.provider, table.providerAccountId),
    })
  );

const _orgAccountTable = mkOrgAccountTable("org");

export type OrgAccount = typeof _orgAccountTable.$inferSelect;
export type NewOrgAccount = typeof _orgAccountTable.$inferInsert;
