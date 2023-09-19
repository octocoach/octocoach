import { mkSessionCols } from "../../common/session";
import { mkOrgPgSchema } from "../schema";
import { mkOrgUserTable } from "./user";

export const mkOrgSessionTable = (slug: string) =>
  mkOrgPgSchema(slug).table("session", mkSessionCols(mkOrgUserTable(slug)));
