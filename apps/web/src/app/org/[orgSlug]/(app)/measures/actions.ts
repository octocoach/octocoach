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
import { ZodError } from "zod";

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

  const id = await db
    .insert(measureTable)
    .values({ owner: user.id })
    .returning()
    .then((rows) => rows[0]?.id);

  const measureInfo = Object.entries(data).map(([locale, measure]) => ({
    locale: locale as Locales,
    ...measure,
    id,
  }));

  const errors: {
    [key in Locales]?: ZodError<NewMeasureInfo>;
  } = {};

  const schema = insertMeasureInfoSchema(orgSlug);

  for (const info of measureInfo) {
    const result = schema.safeParse(info);
    if (result.success === false) {
      // We need to clone the error object because it's not serializable
      errors[info.locale] = JSON.parse(JSON.stringify(result.error));
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  await db.insert(measureInfoTable).values(measureInfo);

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
