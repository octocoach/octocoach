import { text, timestamp } from "drizzle-orm/pg-core";
import type { OrgUserTable, UserTable } from "./user";

export const mkSessionCols = (user: UserTable | OrgUserTable) => ({
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
