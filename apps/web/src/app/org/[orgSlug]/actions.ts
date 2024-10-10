"use server";

import { db } from "@octocoach/db/connection";
import { eq, sql } from "@octocoach/db/operators";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteOrgAction(slug: string) {
  if (!slug) {
    throw new Error("Slug is required");
  }
  await db.execute(sql.raw(`DROP SCHEMA org_${slug} CASCADE`));
  await db.delete(organizationTable).where(eq(organizationTable.slug, slug));

  redirect("/org");
}

export async function acceptCookiesAction() {
  return Promise.resolve().then(() => {
    cookies().set("allow_cookies", "true", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
  });
}
