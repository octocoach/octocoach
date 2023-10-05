import { primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const mkVerificationTokensCols = () => ({
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokenKey = (vt) => ({
  compoundKey: primaryKey(vt.identifier, vt.token),
});
