"use server";

import { authOrRedirect } from "@helpers/auth";
import { getBaseUrl, orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import {
  Module,
  NewModule,
  NewModuleInfo,
  insertModuleInfoSchema,
  insertModuleSchema,
  mkModuleInfoTable,
  mkModuleTable,
} from "@octocoach/db/schemas/org/module";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { getEntries } from "@octocoach/tshelpers";
import { redirect } from "next/navigation";
import { SafeParseSuccess, ZodError } from "zod";

const serialize = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;

export type SaveModuleData = {
  module: Omit<NewModule, "owner">;
  moduleInfo: Record<Locales, Omit<NewModuleInfo, "locale" | "id">>;
};

export type SaveModuleRetype = ReturnType<typeof saveModule>;

export const saveModule = async (orgSlug: string, data: SaveModuleData) => {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach) {
    throw new Error("User is not a coach");
  }

  const db = orgDb(orgSlug);
  const moduleTable = mkModuleTable(orgSlug);
  const moduleInfoTable = mkModuleInfoTable(orgSlug);
  const moduleSchema = insertModuleSchema(orgSlug);
  const moduleInfoSchema = insertModuleInfoSchema(orgSlug);

  const errors: {
    module?: ZodError<NewModule>;
    moduleInfo: { [key in Locales]?: ZodError<NewModuleInfo> };
  } = { moduleInfo: {} };

  const moduleResult = moduleSchema.safeParse({
    ...data.module,
    owner: user.id,
  });

  if (moduleResult.success === false) {
    errors.module = serialize(moduleResult.error);
  }

  const moduleInfoToInsert: SafeParseSuccess<NewModuleInfo>["data"][] = [];

  for (const [locale, moduleInfo] of getEntries(data.moduleInfo)) {
    const result = moduleInfoSchema.safeParse({
      ...moduleInfo,
      locale: locale as Locales,
      id: data.module.id,
    });

    if (result.success === false) {
      // We need to clone the error object because it's not serializable
      errors.moduleInfo[locale] = serialize(result.error);
    } else {
      moduleInfoToInsert.push(result.data);
    }
  }
  if (errors.module || Object.keys(errors.moduleInfo).length > 0) {
    return { success: false, errors };
  }

  if (moduleResult.success === false) {
    throw new Error("Module schema validation failed");
  }

  await db.transaction(async (trx) => {
    const id = await trx
      .insert(moduleTable)
      .values(moduleResult.data)
      .onConflictDoUpdate({
        target: moduleTable.id,
        set: moduleResult.data,
        where: eq(moduleTable.id, moduleResult.data.id),
      })
      .returning()
      .then((rows) => getFirstRow(rows).id);

    for (const info of moduleInfoToInsert) {
      await trx
        .insert(moduleInfoTable)
        .values({
          ...info,
          id,
        })
        .onConflictDoUpdate({
          target: [moduleInfoTable.id, moduleInfoTable.locale],
          set: info,
          where: and(
            eq(moduleInfoTable.id, id),
            eq(moduleInfoTable.locale, info.locale)
          ),
        });
    }
  });

  return { success: true };
};

export const deleteModule = async (orgSlug: string, id: Module["id"]) => {
  const { user } = await authOrRedirect(orgSlug);

  const baseUrl = getBaseUrl();

  const db = orgDb(orgSlug);
  const moduleTable = mkModuleTable(orgSlug);
  const moduleInfoTable = mkModuleInfoTable(orgSlug);

  const mod = await db
    .select()
    .from(moduleTable)
    .where(eq(moduleTable.id, id))
    .then((rows) => rows[0] ?? null);

  if (!mod) {
    throw new Error("Module not found");
  }

  if (mod.owner !== user.id) {
    throw new Error("You are not the owner of this module");
  }

  await db.transaction(async (trx) => {
    await trx.delete(moduleInfoTable).where(eq(moduleInfoTable.id, id));
    await trx.delete(moduleTable).where(eq(moduleTable.id, id));
  });

  redirect(`${baseUrl}/modules`);
};

export const redirectToModule = (moduleId: Module["id"]) => {
  orgRedirect(`admin/modules/${moduleId}`);
};
