import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkMeasureTable } from "./measure";
import { mkUserTable } from "./user";
import { meetingTypeEnum } from "../data-types/meeting";

export type Meeting = ReturnType<typeof mkMeetingTable>["$inferSelect"];
export type NewMeeting = ReturnType<typeof mkMeetingTable>["$inferInsert"];

export const mkMeetingTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const measureTable = mkMeasureTable(slug);
  const userTable = mkUserTable(slug);

  return table("meeting", {
    id: serial("id").primaryKey(),
    measure: integer("measure")
      .notNull()
      .references(() => measureTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    coachee: text("coachee")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    type: meetingTypeEnum("type").notNull(),
    startTime: timestamp("start_time", {
      withTimezone: true,
    }).notNull(),
    endTime: timestamp("end_time", {
      withTimezone: true,
    }).notNull(),
  });
};
