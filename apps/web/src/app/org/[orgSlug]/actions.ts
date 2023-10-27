"use server";

import { eq, sql } from "@octocoach/db/operators";
import { db } from "@octocoach/db/connection";

import { redirect } from "next/navigation";
import { organizationTable } from "@octocoach/db/schemas/public/schema";

export async function deleteOrgAction(slug: string) {
  if (!slug) {
    throw new Error("Slug is required");
  }
  await db.execute(sql.raw(`DROP SCHEMA org_${slug} CASCADE`));
  await db.delete(organizationTable).where(eq(organizationTable.slug, slug));

  redirect("/org");
}
