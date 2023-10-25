import { pgSchema } from "drizzle-orm/pg-core";

export const mkOrgPgSchema = (slug: string) => pgSchema(`org_${slug}`);
