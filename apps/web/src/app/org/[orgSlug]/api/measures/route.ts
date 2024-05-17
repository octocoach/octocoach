import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { orgSlug } }: { params: { orgSlug: string } }
) => {
  const { searchParams } = req.nextUrl;

  const lang = (req.headers.get("accept-language") ||
    searchParams.get("lang") ||
    "en") as Locales;

  const db = orgDb(orgSlug);

  const { measureTable, measureInfoTable } = mkOrgSchema(orgSlug);

  const data = await db
    .select({
      id: measureTable.id,
      title: measureInfoTable.title,
      imageSrc: measureTable.imageSrc,
      imgageAlt: measureInfoTable.imageAlt,
      lang: measureInfoTable.locale,
      description: measureInfoTable.description,
      requirements: measureInfoTable.requirements,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureTable.id, measureInfoTable.id),
        eq(measureInfoTable.locale, lang)
      )
    );

  return NextResponse.json({ count: data.length, data });
};
