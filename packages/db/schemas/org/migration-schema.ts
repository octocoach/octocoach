import { mkOrgPgSchema, mkOrgSchema } from "./schema";

const slug = process.env.SLUG as string;

const schema = mkOrgSchema(slug);

export const orgPgSchema = mkOrgPgSchema(slug);

export const {
  userTable,
  userTableRelations,
  accountTable,
  sessionTable,
  verificationTokenTable,
  organizationTable,
} = schema;
