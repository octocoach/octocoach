import { mkOrgPgSchema } from "../common/pg-schema";
import {
  mkVerificationTokensCols,
  verificationTokenKey,
} from "../common/verification-token";

export const mkOrgVerificationTokenTable = (slug: string) =>
  mkOrgPgSchema(slug).table(
    "verification_token",
    mkVerificationTokensCols(),
    verificationTokenKey
  );
