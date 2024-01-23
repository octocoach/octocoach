import { pgEnum } from "drizzle-orm/pg-core";

export const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "pending",
  "declined",
  "active",
  "paused",
  "completed",
  "dropped-out",
]);
