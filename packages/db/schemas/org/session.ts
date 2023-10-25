import { mkSessionCols } from "../common/session";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";

export const mkOrgSessionTable = (slug: string) =>
  mkOrgPgSchema(slug).table("session", mkSessionCols(mkUserTable(slug)));
