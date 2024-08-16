import { pgEnum } from "drizzle-orm/pg-core";

export const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "pending",
  "declined",
  "rejected",
  "active",
  "paused",
  "completed",
  "dropped-out",
]);
