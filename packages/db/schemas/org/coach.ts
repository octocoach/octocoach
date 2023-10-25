import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";

export const mkCoachTable = (slug: string) => {
  const userTable = mkUserTable(slug);
  return mkOrgPgSchema(slug).table("coach", {
    userId: text("user_id")
      .notNull()
      .primaryKey()
      .references(() => userTable.id),
  });
};

export const mkCoachTableRelations = (slug: string) => {
  const userTable = mkUserTable(slug);
  const coachTable = mkCoachTable(slug);

  return relations(coachTable, ({ one }) => ({
    user: one(userTable, {
      fields: [coachTable.userId],
      references: [userTable.id],
    }),
  }));
};
