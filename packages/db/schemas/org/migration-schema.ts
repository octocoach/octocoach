import { mkOrgPgSchema, mkOrgSchema } from "./schema";

const slug = process.env.SLUG as string;

export const orgPgSchema = mkOrgPgSchema(slug);

export const {
  userTable,
  userTableRelations,
  accountTable,
  sessionTable,
  verificationTokenTable,
  organizationTable,
  organizationTableRelations,
} = mkOrgSchema(slug);
