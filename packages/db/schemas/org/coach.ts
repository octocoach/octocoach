import { text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "./schema";
import { mkUserTable } from "./user";
import { relations } from "drizzle-orm";

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
