"use server";

import { orgDb } from "@octocoach/db/connection";
import { sql } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
  NewContentLocale,
} from "@octocoach/db/schemas/org/content";
import { revalidatePath } from "next/cache";

export const saveContent = async (slug: string, data: NewContentLocale[]) => {
  const db = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  const firstRow = data[0];
  if (!firstRow) {
    throw new Error("Can't save empty data");
  }

  await db
    .insert(contentTable)
    .values({ id: firstRow.id })
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
