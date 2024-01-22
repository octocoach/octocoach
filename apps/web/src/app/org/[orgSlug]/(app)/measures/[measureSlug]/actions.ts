"use server";

import { orgDb } from "@octocoach/db/connection";
import { eq, max } from "@octocoach/db/operators";
import { Measure } from "@octocoach/db/schemas/org/measure";
import { mkMeasureModuleTable } from "@octocoach/db/schemas/org/measure-module";
import { Module } from "@octocoach/db/schemas/org/module";

export type AddMeasureToModuleResponse = ReturnType<typeof addMeasureToModule>;

export const addMeasureToModule = async (
  orgSlug: string,
  { measureId, moduleId }: { measureId: Measure["id"]; moduleId: Module["id"] }
) => {
  const db = orgDb(orgSlug);

  const measureModuleTable = mkMeasureModuleTable(orgSlug);
  const order = await db
    .select({ max: max(measureModuleTable.order) })
    .from(measureModuleTable)
    .where(eq(measureModuleTable.measure, measureId))
    .then((res) => (res[0].max === null ? 0 : res[0].max + 1));

  await db
    .insert(measureModuleTable)
    .values({ measure: measureId, module: moduleId, order });

  return { success: true };
};
