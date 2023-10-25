import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";

export const mkUserProfileTable = (slug: string) => {
  const userTable = mkUserTable(slug);
  return mkOrgPgSchema(slug).table("user_profile", {
    userId: text("user_id")
      .primaryKey()
      .references(() => userTable.id),
    summary: text("summary"),
    summaryHash: text("summary_hash"),
  });
};

export const mkUserProfileRelations = (slug: string) => {
  const userProfileTable = mkUserProfileTable(slug);
  const userTable = mkUserTable(slug);

  return relations(userProfileTable, ({ one }) => ({
    user: one(userTable, {
      fields: [userProfileTable.userId],
      references: [userTable.id],
    }),
  }));
};
