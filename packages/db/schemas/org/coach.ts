import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";
import { mkMeasureTable } from "./measure";
import { mkModuleTable } from "./module";

export const mkCoachTable = (slug: string) => {
  const userTable = mkUserTable(slug);
  return mkOrgPgSchema(slug).table("coach", {
    userId: text("user_id")
      .notNull()
      .primaryKey()
      .references(() => userTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  });
};

export const mkCoachTableRelations = (slug: string) => {
  const userTable = mkUserTable(slug);
  const coachTable = mkCoachTable(slug);
  const measureTable = mkMeasureTable(slug);
  const moduleTable = mkModuleTable(slug);

  return relations(coachTable, ({ many, one }) => ({
    user: one(userTable, {
      fields: [coachTable.userId],
      references: [userTable.id],
    }),
    measure: many(measureTable),
    module: many(moduleTable),
  }));
};
