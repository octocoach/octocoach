import { boolean, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { meetingAttendanceEnum, meetingRoleEnum } from "../data-types/meeting";
import { mkMeetingTable } from "./meeting";
import { mkUserTable } from "./user";

export type MeetingParticipant = ReturnType<
  typeof mkMeetingParticipantTable
>["$inferSelect"];
export type NewMeetingParticipant = ReturnType<
  typeof mkMeetingParticipantTable
>["$inferInsert"];

export const mkMeetingParticipantTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);

  const meetingTable = mkMeetingTable(slug);
  const userTable = mkUserTable(slug);

  return table(
    "meeting_participant",
    {
      meeting: text("meeting")
        .notNull()
        .references(() => meetingTable.id, {
          onDelete: "restrict",
          onUpdate: "cascade",
        }),
      user: text("user")
        .notNull()
        .references(() => userTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      role: meetingRoleEnum("role").notNull().default("coachee"),
      accepted: boolean("accepted").notNull().default(false),
      attendance: meetingAttendanceEnum("attendance"),
      attendanceInfo: text("attendance_info"),
      created: timestamp("created").defaultNow(),
      updated: timestamp("updated").defaultNow(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.meeting, table.user] }),
    })
  );
};
