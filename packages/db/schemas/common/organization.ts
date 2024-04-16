import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

import { toTuple } from "../helpers";
import { addressTable } from "./address";
import { LegalForm, legalForm } from "./legal-form";
import { mkUserCols, OrgUserTable, UserTable } from "./user";

export const whitelistedUsers = [
  "avanderbergh@gmail.com",
  "avanderbergh+gh1@gmail.com",
];

export const legalFormEnum = pgEnum(
  "organization_type",
  toTuple(Object.keys(legalForm))
);

export const mkOrganizationTable = (userTable: UserTable | OrgUserTable) =>
  pgTable("organization", {
    id: serial("id").notNull().primaryKey(),
    displayName: text("display_name").notNull(),
    legalName: text("legal_name").notNull().default(""),
    legalForm: legalFormEnum("type").notNull().default("EU").$type<LegalForm>(),
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
    phone: text("phone"),
    email: text("email"),
    domain: text("domain"),
    githubId: text("github_id"),
    githubSecret: text("github_secret"),
    logo: text("logo"),
    primaryColor: text("primary_color").notNull().default("#8839ef"),
    secondaryColor: text("secondary_color").notNull().default("#dc8a78"),
    registrationNumber: text("registration_number"),
    taxNumber: text("tax_number"),
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
