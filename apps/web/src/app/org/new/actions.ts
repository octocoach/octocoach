"use server";

import mkAuthOptions from "@octocoach/auth/next-auth-config";
import createOrg from "@octocoach/db/actions/create-org";
import { db } from "@octocoach/db/connection";
import { NewAddress, addressTable } from "@octocoach/db/schemas/common/address";
import { NewOragnization } from "@octocoach/db/schemas/common/organization";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type CreateOrganization = Pick<
  NewOragnization,
  "displayName" | "slug" | "legalName" | "legalForm"
> &
  NewAddress;

export async function create({
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

  await createOrg(slug);

  redirect(`/org/${slug}`);
}
