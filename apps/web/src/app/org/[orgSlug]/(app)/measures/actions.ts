"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  Measure,
  NewMeasure,
  NewMeasureInfo,
  mkMeasureInfoTable,
  mkMeasureTable,
} from "@octocoach/db/schemas/org/measure";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  await db.insert(measureInfoTable).values(measureInfo);

  revalidatePath("org/[orgSlug]/(app)/measures", "page");
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

  redirect(`/org/${orgSlug}/measures`);
};
