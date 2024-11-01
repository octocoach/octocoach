"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq, gt, max, sql } from "@octocoach/db/operators";
import {
  Cohort,
  mkCohortTable,
  NewCohort,
} from "@octocoach/db/schemas/org/cohort";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { mkMeasureModuleTable } from "@octocoach/db/schemas/org/measure-module";
import { Module } from "@octocoach/db/schemas/org/module";
import { revalidatePath } from "next/cache";

export type AddMeasureToModuleResponse = ReturnType<typeof addMeasureToModule>;

export const addMeasureToModule = async (
  orgSlug: string,
  { measureId, moduleId }: { measureId: Measure["id"]; moduleId: Module["id"] }
) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("Not allowed!");
  }
  const db = orgDb(orgSlug);

  const measureModuleTable = mkMeasureModuleTable(orgSlug);
  const order = await db
    .select({ max: max(measureModuleTable.order) })
    .from(measureModuleTable)
    .where(eq(measureModuleTable.measure, measureId))
    .then((rows) => getFirstRow(rows))
    .then(({ max }) => (max === null ? 0 : max + 1));

  await db
    .insert(measureModuleTable)
    .values({ measure: measureId, module: moduleId, order });

  return { success: true };
};

export const removeMeasureFromModule = async (
  orgSlug: string,
  { measureId, moduleId }: { measureId: Measure["id"]; moduleId: Module["id"] }
) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("Not allowed!");
  }
  const db = orgDb(orgSlug);

  const measureModuleTable = mkMeasureModuleTable(orgSlug);

  const removed = await db
    .delete(measureModuleTable)
    .where(
      and(
        eq(measureModuleTable.measure, measureId),
        eq(measureModuleTable.module, moduleId)
      )
    )
    .returning()
    .then((rows) => rows[0] ?? null);

  if (!removed) {
    return { success: false };
  }

  await db
    .update(measureModuleTable)
    .set({ order: sql`${measureModuleTable.order} - 1` })
    .where(
      and(
        eq(measureModuleTable.measure, measureId),
        gt(measureModuleTable.order, removed.order)
      )
    );

  return { success: true };
};

export const createCohortAction = async (
  orgSlug: string,
  cohort: NewCohort
) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("Not allowed!");
  }

  const db = orgDb(orgSlug);

  const cohortTable = mkCohortTable(orgSlug);

  console.log("Creating cohort", cohort);
  await db.insert(cohortTable).values(cohort);

  revalidatePath("/org/[orgSlug]/(app)/admin/measures/[measureId]", "page");
};

export const deleteCohortAction = async (orgSlug: string, id: Cohort["id"]) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("Not allowed!");
  }

  const db = orgDb(orgSlug);
  const cohortTable = mkCohortTable(orgSlug);
  await db.delete(cohortTable).where(eq(cohortTable.id, id));

  revalidatePath("/org/[orgSlug]/(app)/admin/measures/[measureId]", "page");
};
