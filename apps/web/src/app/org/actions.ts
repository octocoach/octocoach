"use server";

import { authOrRedirect } from "@helpers/auth";
import { encrypt } from "@octocoach/auth/helpers";
import { db } from "@octocoach/db/connection";
import { createOrgStatements, meta } from "@octocoach/db/helpers/create-org";
import { eq, sql } from "@octocoach/db/operators";
import { NewAddress, addressTable } from "@octocoach/db/schemas/common/address";
import {
  NewOragnization,
  Organization,
} from "@octocoach/db/schemas/common/organization";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { revalidatePath } from "next/cache";

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
  const { user } = await authOrRedirect();
  const statements = createOrgStatements(slug);

  await db.transaction(async (tx) => {
    const addressId = await tx
      .insert(addressTable)
      .values({ addressLine1, addressLine2, city, postcode, state, country })
      .returning()
      .then((rows) => rows[0]?.id!);

    await tx.insert(organizationTable).values({
      displayName,
      legalName,
      legalForm,
      addressId,
      slug,
      owner: user.id,
    });

    for (const statement of statements) {
      await tx.execute(sql.raw(statement.replaceAll("{slug}", slug)));
    }

    await tx.execute(
      sql.raw(
        `INSERT INTO "org_${slug}"."__migrations" VALUES (${meta.version}, ${meta.when})`
      )
    );
  });

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
  slug: string,
  { domain, githubId, githubSecret }: DomainDetails
) {
  if (!githubSecret) {
    throw new Error("Github secret is required");
  }
  const encryptedSecret = encrypt(githubSecret);

  await db
    .update(organizationTable)
    .set({ domain, githubId, githubSecret: encryptedSecret })
    .where(eq(organizationTable.slug, slug));

  revalidatePath("/org", "layout");
}
