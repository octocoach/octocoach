"use server";

import { getServerSession } from "@octocoach/auth";
import { encrypt } from "@octocoach/auth/helpers";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { db } from "@octocoach/db/connection";
import { createOrgStatements } from "@octocoach/db/helpers/create-org";
import { eq, sql } from "@octocoach/db/operators";
import { NewAddress, addressTable } from "@octocoach/db/schemas/common/address";
import {
  NewOragnization,
  Organization,
} from "@octocoach/db/schemas/common/organization";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateOrganization = Pick<
  NewOragnization,
  "displayName" | "slug" | "legalName" | "legalForm"
> &
  NewAddress;

export type OrganizationDetails = Pick<
  Organization,
  | "slug"
  | "logo"
  | "email"
  | "phone"
  | "primaryColor"
  | "secondaryColor"
  | "registrationNumber"
  | "taxNumber"
>;

export async function createOrganization({
  displayName,
  legalName,
  legalForm,
  slug,
  addressLine1,
  addressLine2,
  city,
  postcode,
  state,
  country,
}: CreateOrganization) {
  const { user } = await getServerSession(mkAuthOptions());

  if (!user) redirect("/");

  const addressId = await db
    .insert(addressTable)
    .values({ addressLine1, addressLine2, city, postcode, state, country })
    .returning()
    .then(([{ id }]) => id);

  await db.insert(organizationTable).values({
    displayName,
    legalName,
    legalForm,
    addressId,
    slug,
    owner: user.id,
  });

  const statements = createOrgStatements(slug);

  for (const statement of statements) {
    await db.execute(sql.raw(statement.replaceAll("{slug}", slug)));
  }

  revalidatePath("/org", "page");
}

export async function deleteOrgAction({ slug, id }: Organization) {
  await db.execute(sql.raw(`DROP SCHEMA org_${slug} CASCADE`));
  await db.delete(organizationTable).where(eq(organizationTable.id, id));

  revalidatePath("/org", "page");
}

export async function onSubmit(organizationDetails: OrganizationDetails) {
  const { slug, ...organization } = organizationDetails;

  await db
    .update(organizationTable)
    .set(organization)
    .where(eq(organizationTable.slug, organizationDetails.slug));

  revalidatePath("/org", "layout");
}

export type DomainDetails = Pick<
  Organization,
  "domain" | "githubId" | "githubSecret"
>;
export async function saveDomain(
  slug,
  { domain, githubId, githubSecret }: DomainDetails
) {
  const encryptedSecret = encrypt(githubSecret);

  await db
    .update(organizationTable)
    .set({ domain, githubId, githubSecret: encryptedSecret })
    .where(eq(organizationTable.slug, slug));

  revalidatePath("/org", "layout");
}
