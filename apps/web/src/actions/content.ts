"use server";

import { orgDb } from "@octocoach/db/connection";
import { sql } from "@octocoach/db/operators";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
import { locales } from "@octocoach/i18n/src/i18n-util";
import { revalidatePath } from "next/cache";

// TODO: This should be a type from the db package
export const saveContent = async ({ slug, id }, data: unknown) => {
  const db = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  await db.insert(contentTable).values({ id }).onConflictDoNothing();

  const values = locales.map((locale) => {
    let returnValue = {
      id,
      locale,
      value: {
        title: data[`title_${locale}`],
        text: data[`text_${locale}`],
      },
    };
    if (data.hasOwnProperty("src")) {
      if (!data.hasOwnProperty(`alt_${locale}`)) {
        throw new Error(`Missing alt text for locale ${locale}`);
      }
      returnValue["value"]["image"] = {
        src: data["src"],
        alt: data[`alt_${locale}`],
      };
    }

    return returnValue;
  });

  await db
    .insert(contentLocaleTable)
    .values(values)
    .onConflictDoUpdate({
      target: [contentLocaleTable.id, contentLocaleTable.locale],
      set: {
        value: sql`excluded.value`,
      },
    });

  revalidatePath("/org", "layout");
};
