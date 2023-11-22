import { rawSql } from "../migrations-org/create-org";

export const createOrgStatements = (slug: string) =>
  rawSql.replaceAll(/\{slug\}/g, slug).split("--> statement-breakpoint");
