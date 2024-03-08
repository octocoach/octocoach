import { date, json, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "../common/pg-schema";
import { enrollmentStatusEnum } from "../data-types/enrollment";
import { mkCoachTable } from "./coach";
import { mkMeasureTable } from "./measure";
import { mkUserTable } from "./user";
import { z } from "zod";
import { dbLocales } from "../data-types/locale";

export type ScreeningAnswers = z.infer<typeof screeningAnswersSchema>;

export const screeningAnswersSchema = z.object({
  locale: z.enum(dbLocales),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string().or(z.array(z.string())),
    })
  ),
});

export type Enrollment = ReturnType<typeof mkEnrollmentTable>["$inferSelect"];
export type NewEnrollment = ReturnType<
  typeof mkEnrollmentTable
>["$inferInsert"];

export const mkEnrollmentTable = (slug: string) => {
  const measureTable = mkMeasureTable(slug);
  const userTable = mkUserTable(slug);
  const coachTable = mkCoachTable(slug);

  return mkOrgPgSchema(slug).table(
    "enrollment",
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
