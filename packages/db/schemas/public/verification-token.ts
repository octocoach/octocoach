import { pgTable } from "drizzle-orm/pg-core";
import {
  mkVerificationTokensCols,
  verificationTokenKey,
} from "../common/verification-token";

export const verificationTokenTable = pgTable(
  "verification_token",
  mkVerificationTokensCols(),
  verificationTokenKey
);
