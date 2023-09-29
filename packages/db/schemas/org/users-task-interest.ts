import { relations } from "drizzle-orm";
import { integer, primaryKey, text } from "drizzle-orm/pg-core";
import { taskTable } from "../common/task";
import { mkOrgPgSchema } from "./schema";
import { mkUserTable } from "./user";

export type UsersTaskInterest = ReturnType<
  typeof mkUsersTaskInterestTable
>["$inferSelect"];
export type NewUsersTaskInterest = ReturnType<
  typeof mkUsersTaskInterestTable
>["$inferInsert"];

export const mkUsersTaskInterestTable = (slug: string) => {
  const { table } = mkOrgPgSchema(slug);
  const orgUserTable = mkUserTable(slug);

  return table(
    "users_task_interest",
    {
      userId: text("user_id")
        .notNull()
        .references(() => orgUserTable.id),
      taskId: integer("task_id")
        .notNull()
        .references(() => taskTable.id),
      interest: integer("integer").notNull(),
    },
    ({ userId, taskId }) => ({
      pk: primaryKey(userId, taskId),
    })
  );
};

export const mkUsersTaskInterestRelations = (slug: string) => {
  const usersTaskInterestTable = mkUsersTaskInterestTable(slug);
  const orgUserTable = mkUserTable(slug);

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
