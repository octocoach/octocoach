import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { notFound } from "next/navigation";

import type { MeasureWithInfoParam, Params } from "../types";
import IndividualEnrollment from "./individual-enrollment";

export default async function Page({ params: { orgSlug, measureId } }: Params) {
  const { user } = await authOrRedirect(orgSlug);
  const db = orgDb(orgSlug);
  const locale = getLocale();

  const { measureInfoTable, measureTable, userProfileTable } =
    mkOrgSchema(orgSlug);

  const profile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    const search = new URLSearchParams();
    search.set("origin", `/measures/${measureId}/apply`);
    orgRedirect(`signup?${search.toString()}`);
  }

  const measure: MeasureWithInfoParam | null = await db
    .select({
      id: measureTable.id,
      type: measureTable.type,
      title: measureInfoTable.title,
      screeningQuestions: measureInfoTable.screeningQuestions,
      owner: measureTable.owner,
    })
    .from(measureTable)
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(eq(measureTable.id, measureId))
    .then((rows) => rows[0] ?? null);

  if (!measure) notFound();

  if (measure.type !== "individual")
    throw new Error("This is not an individual measure");

  return (
    <IndividualEnrollment
      orgSlug={orgSlug}
      locale={locale}
      measure={measure}
      user={user}
    />
  );
}
