import { accountKey, mkAccountCols } from "../common/account";
import { mkOrgPgSchema } from "./schema";
import { mkUserTable } from "./user";

export const mkOrgAccountTable = (slug: string) =>
  mkOrgPgSchema(slug).table(
    "account",
    mkAccountCols(mkUserTable(slug)),
    accountKey
  );
