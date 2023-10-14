import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { toTuple } from "../helpers";
import { addressTable } from "./address";
import { legalForm } from "./legal-form";
import { OrgUserTable, UserTable, mkUserCols } from "./user";

export const legalFormEnum = pgEnum(
  "organization_type",
  toTuple(Object.keys(legalForm))
);

export const mkOrganizationTable = (userTable: UserTable | OrgUserTable) =>
  pgTable("organization", {
    id: serial("id").notNull().primaryKey(),
    displayName: text("display_name").notNull(),
    legalName: text("legal_name").notNull().default(""),
    legalForm: legalFormEnum("type").notNull().default("EU"),
    slug: text("slug").notNull(),
    owner: text("user_id")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    addressId: integer("address_id").references(() => addressTable.id, {
      onDelete: "cascade",
      onUpdate: "set null",
    }),
    domain: text("domain"),
    logo: text("logo"),
    primaryColor: text("primary_color").notNull().default("#8839ef"),
    secondaryColor: text("secondary_color").notNull().default("#dc8a78"),
    registrationNumber: text("registration_number"),
    taxNumber: text("tax_number"),
    tagLine: text("tag_line"),
  });

export const mkOrganizationTableRelations = (
  userTable: UserTable | OrgUserTable
) => {
  const organizationTable = mkOrganizationTable(userTable);

  return relations(organizationTable, ({ one }) => ({
    address: one(addressTable, {
      fields: [organizationTable.addressId],
      references: [addressTable.id],
    }),
    owner: one(userTable, {
      fields: [organizationTable.owner],
      references: [userTable.id],
    }),
  }));
};

const _userTable = pgTable("user", mkUserCols());
const _organizationTable = mkOrganizationTable(_userTable);
export type NewOragnization = typeof _organizationTable.$inferInsert;
export type Organization = typeof _organizationTable.$inferSelect;
