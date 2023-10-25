import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { mkAccountCols } from "../common/account";
import { userTable } from "./user";

export const accountTable = pgTable(
  "account",
  mkAccountCols(userTable),
  (table) => ({
    pk: primaryKey(table.provider, table.providerAccountId),
  })
);
