import { text } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { mkOrgPgSchema } from "./schema";
import { mkOrgUserTable } from "./user";
import { relations } from "drizzle-orm";
import { taskTable } from "../common/task";

export type UsersTaskInterest = ReturnType<
  typeof mkUsersTaskInterestTable
>["$inferSelect"];
export type NewUsersTaskInterest = ReturnType<
  typeof mkUsersTaskInterestTable
>["$inferInsert"];

export const mkUsersTaskInterestTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const orgUserTable = mkOrgUserTable(slug);

  return table("users_task_interest", {
    userId: text("user_id")
      .notNull()
      .references(() => orgUserTable.id),
    taskId: integer("task_id")
      .notNull()
      .references(() => taskTable.id),
    interest: integer("integer").notNull(),
  });
};

export const mkUsersTaskInterestRelations = (slug: string) => {
  const usersTaskInterestTable = mkUsersTaskInterestTable(slug);
  const orgUserTable = mkOrgUserTable(slug);

  return relations(usersTaskInterestTable, ({ one }) => ({
    user: one(orgUserTable, {
      fields: [usersTaskInterestTable.userId],
      references: [orgUserTable.id],
    }),
    task: one(taskTable, {
      fields: [usersTaskInterestTable.taskId],
      references: [taskTable.id],
    }),
  }));
};
