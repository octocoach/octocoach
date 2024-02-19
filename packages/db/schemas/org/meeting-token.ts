import { integer, primaryKey, text } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkMeetingTable } from "./meeting";
import { mkUserTable } from "./user";

export type MeetingToken = ReturnType<
  typeof mkMeetingTokenTable
>["$inferSelect"];
export type NewMeetingToken = ReturnType<
  typeof mkMeetingTokenTable
>["$inferInsert"];

export const mkMeetingTokenTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const meetingTable = mkMeetingTable(slug);
  const userTable = mkUserTable(slug);

  return table(
    "meeting_token",
    {
      meeting: integer("meeting")
        .notNull()
        .references(() => meetingTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      user: text("user")
        .notNull()
        .references(() => userTable.id, {
          onDelete: "cascade",
          onUpdate: "cascade",
        }),
      token: text("token").notNull(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.meeting, table.user] }),
    })
  );
};
