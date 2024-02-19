import { pgEnum } from "drizzle-orm/pg-core";

export const meetingTypeEnum = pgEnum("meeting_type", [
  "consultation",
  "coaching",
]);
