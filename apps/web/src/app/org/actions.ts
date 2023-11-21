"use server";

import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import createOrg from "@octocoach/db/actions/create-org";
import { db } from "@octocoach/db/connection";
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

  console.log("importing drizzle-kit");

  const suppressOutput = async (fn) => {
    const originalStdoutWrite = process.stdout.write.bind(process.stdout);
    const originalStderrWrite = process.stderr.write.bind(process.stderr);

    // Function matching the signature of `process.stdout.write` but doing nothing
    const doNothing = (buffer, cb) => {
      if (cb) {
        cb();
      }
      return true;
    };

    // Temporarily suppress output
    process.stdout.write = doNothing;
    process.stderr.write = doNothing;

    try {
      await fn();
    } catch (error) {
      console.error("Error during suppressed function execution", error);
    } finally {
      // Restore original stdout and stderr
      process.stdout.write = originalStdoutWrite;
      process.stderr.write = originalStderrWrite;
    }
  };

  // Usage
  suppressOutput(async () => {
    await import("drizzle-kit/index.cjs");
  });

  console.log("importing drizzle-kit done");

  await createOrg(slug);
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
