import { accountKey, mkAccountCols } from "../../common/account";
import { mkOrgPgSchema } from "../schema";
import { mkOrgUserTable } from "./user";

export const mkOrgAccountTable = (slug: string) =>
  mkOrgPgSchema(slug).table(
    "account",
    mkAccountCols(mkOrgUserTable(slug)),
    accountKey
  );
