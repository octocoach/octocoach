import { primaryKey } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkVerificationTokensCols } from "../common/verification-token";

export const mkOrgVerificationTokenTable = (slug: string) =>
  mkOrgPgSchema(slug).table(
    "verification_token",
    mkVerificationTokensCols(),
    (table) => ({
      pk: primaryKey({ columns: [table.identifier, table.token] }),
    })
  );
