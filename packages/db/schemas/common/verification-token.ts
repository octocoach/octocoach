import { text, timestamp } from "drizzle-orm/pg-core";

export const mkVerificationTokensCols = () => ({
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
