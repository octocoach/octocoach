import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { OrgUserTable, UserTable } from "./user";

export const mkOrganizationTable = (userTable: UserTable | OrgUserTable) =>
  pgTable("organization", {
    id: serial("id").notNull().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    owner: text("user_id")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  });

export const mkOrganizationTableRelations = (
  userTable: UserTable | OrgUserTable
) => {
  const organizationTable = mkOrganizationTable(userTable);
  return relations(organizationTable, ({ one }) => ({
    owner: one(userTable, {
      fields: [organizationTable.owner],
      references: [userTable.id],
    }),
  }));
};
