import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { mkOrganizationTable } from "../common/organization";
import { mkUserCols } from "../common/user";

export type PlatformUser = typeof userTable.$inferSelect;
export type NewPlatformUser = typeof userTable.$inferInsert;

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
