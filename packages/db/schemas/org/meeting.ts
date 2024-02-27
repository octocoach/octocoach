import { text, timestamp } from "drizzle-orm/pg-core";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import { mkOrgPgSchema } from "../common/pg-schema";
import { meetingTypeEnum } from "../data-types/meeting";
import { mkMeasureTable } from "./measure";

export type Meeting = ReturnType<typeof mkMeetingTable>["$inferSelect"];
export type NewMeeting = ReturnType<typeof mkMeetingTable>["$inferInsert"];

const nanoid = customAlphabet(lowercase, 12);

export const mkMeetingTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const measureTable = mkMeasureTable(slug);

  return table("meeting", {
    id: text("id")
      .primaryKey()
      .$default(() => nanoid()),
    measure: text("measure")
      .notNull()
      .references(() => measureTable.id, {
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
