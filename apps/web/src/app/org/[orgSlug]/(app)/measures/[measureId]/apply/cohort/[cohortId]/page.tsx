import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import type { Cohort } from "@octocoach/db/schemas/org/cohort";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { notFound } from "next/navigation";

import type {
  MeasureWithInfoParam,
  Params as ParentParams,
} from "../../../types";
import CohortEnrollment from "./cohort-enrollment";

type Params = ParentParams & { params: { cohortId: Cohort["id"] } };

export default async function Page({
  params: { orgSlug, measureId, cohortId },
}: Params) {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const locale = getLocale();

  const { userProfileTable, measureTable, measureInfoTable } =
    mkOrgSchema(orgSlug);

  const profile = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    const search = new URLSearchParams();
    search.set("origin", `/measures/${measureId}/apply/cohort/${cohortId}`);
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

  if (measure.type !== "cohort")
    throw new Error("This is not a cohort measure");

  return (
    <CohortEnrollment
      orgSlug={orgSlug}
      locale={locale}
      measure={measure}
      cohortId={cohortId}
      user={user}
    />
  );
}
