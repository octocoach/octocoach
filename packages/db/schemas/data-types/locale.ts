import { pgEnum } from "drizzle-orm/pg-core";

export const localeEnum = pgEnum("locale", ["en", "de"]);

export const dbLocales = localeEnum.enumValues;
