import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { tasks } from "./tasks";
import { users } from "./users";
import { InferModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const usersTasksInterest = pgTable(
  "tasks_to_users",
  {
    taskId: integer("task_id")
      .notNull()
      .references(() => tasks.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    interest: integer("integer").notNull(),
  },
  ({ taskId, userId }) => ({
    pk: primaryKey(taskId, userId),
  })
);

export const usersTasksInterestRelations = relations(
  usersTasksInterest,
  ({ one }) => ({
    user: one(users, {
      fields: [usersTasksInterest.userId],
      references: [users.id],
    }),
    task: one(tasks, {
      fields: [usersTasksInterest.taskId],
      references: [tasks.id],
    }),
  })
);

export type UsersTasksInterest = InferModel<typeof usersTasksInterest>;
export const usersTasksInterestSchema = createInsertSchema(usersTasksInterest);
