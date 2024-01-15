import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import {
  mkVerificationTokensCols,
} from "../common/verification-token";

export const verificationTokenTable = pgTable(
  "verification_token",
  mkVerificationTokensCols(),
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  })
);
