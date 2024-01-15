"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  Measure,
  NewMeasure,
  NewMeasureInfo,
  insertMeasureInfoSchema,
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { redirect } from "next/navigation";
import { SafeParseSuccess, ZodError } from "zod";
import { getEntries } from "@octocoach/tshelpers";

export type NewMeasureWithInfo = Omit<
  NewMeasure & NewMeasureInfo,
  "owner" | "locale"
>;

export const saveMeasure = async (
  orgSlug: Organization["slug"],
  data: Record<Locales, NewMeasureWithInfo>
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const measureTable = mkMeasureTable(orgSlug);
  const measureInfoTable = mkMeasureInfoTable(orgSlug);
  const schema = insertMeasureInfoSchema(orgSlug);

  const errors: {
    [key in Locales]?: ZodError<NewMeasureInfo>;
  } = {};

  const toInsert: SafeParseSuccess<NewMeasureInfo>["data"][] = [];

  for (const [locale, measure] of getEntries(data)) {
    const result = schema.safeParse({
      locale: locale as Locales,
      ...measure,
    });

    if (result.success === false) {
      // We need to clone the error object because it's not serializable
      errors[locale] = JSON.parse(JSON.stringify(result.error));
    } else {
      toInsert.push(result.data);
    }
  }
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  await db.transaction(async (trx) => {
    const id = await trx
      .insert(measureTable)
      .values({ owner: user.id })
      .returning()
      .then((rows) => rows[0]?.id);

    await trx
      .insert(measureInfoTable)
      .values(toInsert.map((v) => ({ ...v, id })));
  });

  return { success: true };
};

export type SaveMeasureRetype = ReturnType<typeof saveMeasure>;

export const deleteMeasure = async (
  orgSlug: Organization["slug"],
  id: Measure["id"]
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const measureTable = mkMeasureTable(orgSlug);
  const measureInfoTable = mkMeasureInfoTable(orgSlug);

  const measure = await db
    .select()
    .from(measureTable)
    .where(eq(measureTable.id, id))
    .then((rows) => rows[0] ?? null);

  if (!measure) {
    throw new Error("Measure not found");
  }

  if (measure.owner !== user.id) {
    throw new Error("You are not the owner of this measure");
  }

  await db.delete(measureInfoTable).where(eq(measureInfoTable.id, id));
  await db.delete(measureTable).where(eq(measureTable.id, id));

  redirect(`/org/${orgSlug}/measures`);
};
