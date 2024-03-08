import { pgEnum } from "drizzle-orm/pg-core";

export const meetingTypeEnum = pgEnum("meeting_type", [
  "consultation",
  "coaching",
]);

export const meetingRoleEnum = pgEnum("meeting_role", ["coach", "coachee"]);

export const meetingAttendanceEnum = pgEnum("meeting_attendance", [
  "present",
  "absent_unexcused",
  "absent_excused",
]);
