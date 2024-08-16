import { date, json, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

import { mkOrgPgSchema } from "../common/pg-schema";
import { enrollmentStatusEnum } from "../data-types/enrollment";
import { mkCoachTable } from "./coach";
import { mkMeasureTable } from "./measure";
import { ScreeningAnswers } from "./screening-questions";
import { mkUserTable } from "./user";

export type IndividualEnrollment = ReturnType<
  typeof mkIndividualEnrollmentTable
>["$inferSelect"];
export type NewIndividualEnrollment = ReturnType<
  typeof mkIndividualEnrollmentTable
>["$inferInsert"];

export const mkIndividualEnrollmentTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const userTable = mkUserTable(slug);
  const coachTable = mkCoachTable(slug);

  return mkOrgPgSchema(slug).table(
    "individual_enrollment",
    {
      measure: text("measure")
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
      roomName: text("room_name"),
      screeningAnswers: json("screening_answers").$type<ScreeningAnswers>(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.measure, table.coachee] }),
    })
  );
};
