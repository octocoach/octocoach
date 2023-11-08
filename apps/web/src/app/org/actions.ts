"use server";

import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import createOrg from "@octocoach/db/actions/create-org";
import { db, orgDb } from "@octocoach/db/connection";
import { eq, sql } from "@octocoach/db/operators";
import { NewAddress, addressTable } from "@octocoach/db/schemas/common/address";
import {
  NewOragnization,
  Organization,
} from "@octocoach/db/schemas/common/organization";
import {
  mkContentLocaleTable,
  mkContentTable,
} from "@octocoach/db/schemas/org/content";
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
  | "primaryColor"
  | "secondaryColor"
  | "registrationNumber"
  | "taxNumber"
> & {
  heroSectionImageSrc: string;
  heroSectionImageAlt: string;
  heroSectionTitleEn: string;
  heroSectionTextEn: string;
  heroSectionTitleDe: string;
  heroSectionTextDe: string;
};

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

  await createOrg(slug);
  revalidatePath("/org", "page");
}

export async function deleteOrgAction({ slug, id }: Organization) {
  await db.execute(sql.raw(`DROP SCHEMA org_${slug} CASCADE`));
  await db.delete(organizationTable).where(eq(organizationTable.id, id));

  revalidatePath("/org", "page");
}

export async function onSubmit(organizationDetails: OrganizationDetails) {
  const {
    slug,
    heroSectionImageSrc,
    heroSectionImageAlt,
    heroSectionTitleEn,
    heroSectionTextEn,
    heroSectionTitleDe,
    heroSectionTextDe,
    ...organization
  } = organizationDetails;

  const organizationDb = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  const heroValue = {
    id: "hero",
    image: { src: heroSectionImageSrc, alt: heroSectionImageAlt },
  };

  await organizationDb
    .insert(contentTable)
    .values([heroValue])
    .onConflictDoUpdate({
      target: contentTable.id,
      set: {
        image: sql`excluded.image`,
      },
    });

  await organizationDb
    .insert(contentLocaleTable)
    .values([
      {
        id: "hero",
        locale: "en",
        value: { title: heroSectionTitleEn, text: heroSectionTextEn },
      },
      {
        id: "hero",
        locale: "de",
        value: { title: heroSectionTitleDe, text: heroSectionTextDe },
      },
    ])
    .onConflictDoUpdate({
      target: [contentLocaleTable.id, contentLocaleTable.locale],
      set: {
        value: sql`excluded.value`,
      },
    });

  await db
    .update(organizationTable)
    .set(organization)
    .where(eq(organizationTable.slug, organizationDetails.slug));

  revalidatePath("/org", "layout");
}
