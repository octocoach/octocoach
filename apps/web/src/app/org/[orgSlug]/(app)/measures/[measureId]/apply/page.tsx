import { authOrRedirect } from "@helpers/auth";
import { getLocale } from "@helpers/locale";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Measure, MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { exhaustiveCheck } from "@octocoach/tshelpers";
import { notFound } from "next/navigation";

import type { Params } from "../types";
import CohortEnrollment from "./cohort-enrollment";
import IndividualEnrollment from "./individual-enrollment";

export type MeasureWithInfoParam = Pick<
  MeasureWithInfo,
  "id" | "type" | "title" | "screeningQuestions" | "owner"
>;

const getEnrollmentComponent = (type: Measure["type"]) => {
  switch (type) {
    case "individual":
      return IndividualEnrollment;
    case "cohort":
      return CohortEnrollment;
    default:
      return exhaustiveCheck(type);
  }
};

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

  const EnrollmentComponent = getEnrollmentComponent(measure.type);

  return (
    <EnrollmentComponent
      orgSlug={orgSlug}
      locale={locale}
      measure={measure}
      user={user}
    />
  );
}
