import { integer, text } from "drizzle-orm/pg-core";
import { type OrgUserTable, type UserTable } from "./user";

type AccountType = "oauth" | "oidc" | "email";

export const mkAccountCols = (users: UserTable | OrgUserTable) => ({
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});
