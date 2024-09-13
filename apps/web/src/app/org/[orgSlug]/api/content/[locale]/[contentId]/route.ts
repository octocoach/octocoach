import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Content } from "@octocoach/db/schemas/org/content";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { NextRequest, NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (
  _: NextRequest,
  {
    params: { orgSlug, locale, contentId },
  }: { params: { orgSlug: string; locale: Locales; contentId: Content["id"] } }
) => {
  const db = orgDb(orgSlug);

  const { contentLocaleTable } = mkOrgSchema(orgSlug);
  const data = await db
    .select()
    .from(contentLocaleTable)
    .where(
      and(
        eq(contentLocaleTable.locale, locale),
        eq(contentLocaleTable.id, contentId)
      )
    )
    .then((rows) => rows[0] ?? null);

  if (!data)
    return NextResponse.json({ error: "Not found" }, { status: 404, headers });

  return NextResponse.json(data, {
    headers,
  });
};
