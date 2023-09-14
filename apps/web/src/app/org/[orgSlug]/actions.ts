"use server";

import { eq, sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { organizations } from "@octocoach/db/src/schema/organizations";
import { redirect } from "next/navigation";

export async function deleteOrgAction(slug: string) {
  console.log("deleteOrgAction", slug);

  if (!slug) {
    throw new Error("Slug is required");
  }
  await db.execute(sql.raw(`DROP SCHEMA org_${slug} CASCADE`));
  await db.delete(organizations).where(eq(organizations.slug, slug));

  redirect("/org");
}
