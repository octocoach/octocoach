"use server";

import { authOrRedirect } from "@helpers/auth";
import { serialize } from "@helpers/index";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  insertMeasureInfoSchema,
  insertMeasureSchema,
  Measure,
  mkMeasureInfoTable,
  mkMeasureTable,
  NewMeasure,
  NewMeasureInfo,
} from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { getEntries } from "@octocoach/tshelpers";
import { redirect } from "next/navigation";
import { SafeParseSuccess, ZodError } from "zod";

export type SaveMeasureData = {
  measure: Omit<Measure, "owner">;
  measureInfo: Record<Locales, Omit<NewMeasureInfo, "locale" | "id">>;
};

export type SaveMeasureRetype = ReturnType<typeof saveMeasure>;

export const saveMeasure = async (
  orgSlug: Organization["slug"],
  data: SaveMeasureData
) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("User is not a coach");
  }

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
    errors.measure = serialize(measureResult.error);
  }

  const measureInfoToInsert: SafeParseSuccess<NewMeasureInfo>["data"][] = [];

  for (const [locale, measureInfo] of getEntries(data.measureInfo)) {
    const result = measureInfoSchema.safeParse({
      ...measureInfo,
      locale: locale as Locales,
      id: data.measure.id,
    });

    if (result.success === false) {
      // We need to clone the error object because it's not serializable
      errors.measureInfo[locale] = serialize(result.error);
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
      .onConflictDoUpdate({
        target: measureTable.id,
        set: measureResult.data,
        where: eq(measureTable.id, measureResult.data.id),
      })
      .returning()
      .then((rows) => getFirstRow(rows).id);

    for (const info of measureInfoToInsert) {
      await trx
        .insert(measureInfoTable)
        .values({ ...info, id })
        .onConflictDoUpdate({
          target: [measureInfoTable.id, measureInfoTable.locale],
          set: info,
          where: and(
            eq(measureInfoTable.id, id),
            eq(measureInfoTable.locale, info.locale)
          ),
        });
    }
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

export const redirectToMeasure = (id: Measure["id"]) => {
  orgRedirect(`/admin/measures/${id}`);
};
