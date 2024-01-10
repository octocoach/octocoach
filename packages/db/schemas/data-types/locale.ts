import { pgEnum } from "drizzle-orm/pg-core";

export const localeEnum = pgEnum("locale", ["en", "de"]);
