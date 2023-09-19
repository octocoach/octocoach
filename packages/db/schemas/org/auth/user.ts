import { relations } from "drizzle-orm";
import { mkUserCols } from "../../common/user";
import { mkOrgPgSchema } from "../schema";
import { organizationTable } from "../../common/organization";

export const mkOrgUserTable = (slug: string) =>
  mkOrgPgSchema(slug).table("user", mkUserCols());

export const mkOrgUserTableRelations = (slug: string) => {
  const orgUserTable = mkOrgUserTable(slug);
  return relations(orgUserTable, ({ one }) => ({
    organization: one(organizationTable, {
      fields: [orgUserTable.id],
      references: [organizationTable.id],
    }),
  }));
};
