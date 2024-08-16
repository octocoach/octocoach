import { json, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

import { mkOrgPgSchema } from "../common/pg-schema";
import { enrollmentStatusEnum } from "../data-types/enrollment";
import { mkCohortTable } from "./cohort";
import { ScreeningAnswers } from "./screening-questions";
import { mkUserTable } from "./user";

export type CohortEnrollment = ReturnType<
  typeof mkCohortEnrollmentTable
>["$inferSelect"];
export type NewCohortEnrollment = ReturnType<
  typeof mkCohortEnrollmentTable
>["$inferInsert"];

export const mkCohortEnrollmentTable = (slug: string) => {
  const cohortTable = mkCohortTable(slug);
  const userTable = mkUserTable(slug);

  return mkOrgPgSchema(slug).table(
    "cohort_enrollment",
    {
      cohort: text("cohort")
        .notNull()
        .references(() => cohortTable.id, {
          onDelete: "restrict",
          onUpdate: "cascade",
        }),
      user: text("user")
        .notNull()
        .references(() => userTable.id, {
          onDelete: "restrict",
          onUpdate: "cascade",
        }),
      status: enrollmentStatusEnum("status").notNull().default("pending"),
      comments: text("comments"),
      screeningAnswers: json("screening_answers").$type<ScreeningAnswers>(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.cohort, table.user] }),
    })
  );
};
