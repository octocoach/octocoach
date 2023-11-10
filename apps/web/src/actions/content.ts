"use server";

import { orgDb } from "@octocoach/db/connection";
import { sql } from "@octocoach/db/operators";
import {
  NewContentLocale,
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import { revalidatePath } from "next/cache";

// TODO: This should be a type from the db package
export const saveContent = async (slug: string, data: NewContentLocale[]) => {
  const db = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  await db
    .insert(contentTable)
    .values({ id: data[0].id })
    .onConflictDoNothing();

  await db
    .insert(contentLocaleTable)
    .values(data)
    .onConflictDoUpdate({
      target: [contentLocaleTable.id, contentLocaleTable.locale],
      set: {
        value: sql`excluded.value`,
      },
    });

  revalidatePath("/org", "layout");
};
