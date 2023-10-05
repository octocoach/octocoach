import { pgTable } from "drizzle-orm/pg-core";
import { accountKey, mkAccountCols } from "../common/account";
import { userTable } from "./user";

export const accountTable = pgTable(
  "account",
  mkAccountCols(userTable),
  accountKey
);
