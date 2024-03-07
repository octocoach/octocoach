import { relations } from "drizzle-orm";
import { integer, json, text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkUserTable } from "./user";
import { mkMeasureTable } from "./measure";
import { mkModuleTable } from "./module";

export type Time = {
  hh: number;
  mm: number;
};

export type Slot = {
  startTime: Time;
  endTime: Time;
};

export type Availability = Record<number, Slot[]>;

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
    hoursBuffer: integer("hours_buffer").notNull().default(12),
    availability: json("availability").$type<Availability>(),
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
