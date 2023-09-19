import { pgTable } from "drizzle-orm/pg-core";
import { mkUserCols } from "../../common/user";
import { relations } from "drizzle-orm";
import { mkOrganizationTable } from "../../common/organization";

export const userTable = pgTable("user", mkUserCols());

export const userTableRelations = relations(userTable, ({ one }) => {
  const organizationTable = mkOrganizationTable(userTable);
  return {
    organization: one(organizationTable, {
      fields: [userTable.id],
      references: [organizationTable.id],
    }),
  };
});
