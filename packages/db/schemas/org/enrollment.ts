import { date, integer, text, timestamp } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { mkCoachTable } from "./coach";
import { mkMeasureTable } from "./measure";
import { mkUserTable } from "./user";
import { enrollmentStatusEnum } from "../data-types/enrollment";

export type Enrollment = ReturnType<typeof mkEnrollmentTable>["$inferSelect"];
export type NewEnrollment = ReturnType<
  typeof mkEnrollmentTable
>["$inferInsert"];

export const mkEnrollmentTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const userTable = mkUserTable(slug);
  const coachTable = mkCoachTable(slug);

  return mkOrgPgSchema(slug).table("enrollment", {
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
    coach: text("coach").references(() => coachTable.userId, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
    status: enrollmentStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    startDate: date("start_date", { mode: "date" }),
    endDate: date("end_date", { mode: "date" }),
    comments: text("comments"),
  });
};
