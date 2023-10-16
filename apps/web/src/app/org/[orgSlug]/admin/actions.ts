"use server";

import { db } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { redirect } from "next/navigation";

export type OrganizationDetails = Pick<
  Organization,
  | "slug"
  | "primaryColor"
  | "secondaryColor"
  | "tagLine"
  | "registrationNumber"
  | "taxNumber"
>;

export async function onSubmit(organizationDetails: OrganizationDetails) {
  const { slug, ...rest } = organizationDetails;

  await db
    .update(organizationTable)
    .set(rest)
    .where(eq(organizationTable.slug, organizationDetails.slug));

  redirect(`/org/${slug}`);
}
