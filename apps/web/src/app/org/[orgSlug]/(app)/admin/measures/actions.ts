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
  insertMeasureSchema,
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { redirect } from "next/navigation";
import { SafeParseSuccess, ZodError } from "zod";
import { getEntries } from "@octocoach/tshelpers";

export type SaveMeasureData = {
  measure: Omit<NewMeasure, "owner">;
  measureInfo: Record<Locales, Omit<NewMeasureInfo, "locale">>;
};

export type SaveMeasureRetype = ReturnType<typeof saveMeasure>;

export const saveMeasure = async (
  orgSlug: Organization["slug"],
  data: SaveMeasureData
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const measureTable = mkMeasureTable(orgSlug);
  const measureInfoTable = mkMeasureInfoTable(orgSlug);
  const measureSchema = insertMeasureSchema(orgSlug);
  const measureInfoSchema = insertMeasureInfoSchema(orgSlug);

  const errors: {
    measure?: ZodError<NewMeasure>;
    measureInfo: { [key in Locales]?: ZodError<NewMeasureInfo> };
  } = { measureInfo: {} };

  const measureResult = measureSchema.safeParse({
    ...data.measure,
    owner: user.id,
  });

  if (measureResult.success === false) {
    errors.measure = JSON.parse(JSON.stringify(measureResult.error));
  }

  const measureInfoToInsert: SafeParseSuccess<NewMeasureInfo>["data"][] = [];

  for (const [locale, measureInfo] of getEntries(data.measureInfo)) {
    const result = measureInfoSchema.safeParse({
      locale: locale as Locales,
      ...measureInfo,
    });

    if (result.success === false) {
      // We need to clone the error object because it's not serializable
      errors.measureInfo[locale] = JSON.parse(JSON.stringify(result.error));
    } else {
      measureInfoToInsert.push(result.data);
    }
  }
  if (errors.measure || Object.keys(errors.measureInfo).length > 0) {
    return { success: false, errors };
  }

  if (measureResult.success === false) {
    throw new Error("Measure is not valid");
  }

  await db.transaction(async (trx) => {
    const id = await trx
      .insert(measureTable)
      .values(measureResult.data)
      .returning()
      .then((rows) => rows[0]?.id);

    await trx
      .insert(measureInfoTable)
      .values(measureInfoToInsert.map((info) => ({ ...info, id })));
  });

  return { success: true };
};

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

  redirect(`/org/${orgSlug}/admin/measures`);
};