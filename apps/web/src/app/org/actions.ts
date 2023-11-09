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
  SectionId,
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
  heroSectionImageAltEn: string;
  heroSectionImageAltDe: string;
  heroSectionTitleEn: string;
  heroSectionTextEn: string;
  heroSectionTitleDe: string;
  heroSectionTextDe: string;
  aboutSectionTitleEn: string;
  aboutSectionTextEn: string;
  aboutSectionTitleDe: string;
  aboutSectionTextDe: string;
  coachSectionImageSrc: string;
  coachSectionImageAltEn: string;
  coachSectionImageAltDe: string;
  coachSectionTitleEn: string;
  coachSectionTextEn: string;
  coachSectionTitleDe: string;
  coachSectionTextDe: string;
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
    heroSectionImageAltEn,
    heroSectionImageAltDe,
    heroSectionTitleEn,
    heroSectionTextEn,
    heroSectionTitleDe,
    heroSectionTextDe,
    aboutSectionTitleEn,
    aboutSectionTextEn,
    aboutSectionTitleDe,
    aboutSectionTextDe,
    coachSectionImageSrc,
    coachSectionImageAltEn,
    coachSectionImageAltDe,
    coachSectionTitleEn,
    coachSectionTextEn,
    coachSectionTitleDe,
    coachSectionTextDe,
    ...organization
  } = organizationDetails;

  const organizationDb = orgDb(slug);
  const contentTable = mkContentTable(slug);
  const contentLocaleTable = mkContentLocaleTable(slug);

  const heroValue = {
    id: "hero" as SectionId,
  };

  const aboutValue = {
    id: "about" as SectionId,
  };

  const coachValue = {
    id: "coach" as SectionId,
  };

  await organizationDb
    .insert(contentTable)
    .values([heroValue, aboutValue, coachValue])
    .onConflictDoNothing();

  await organizationDb
    .insert(contentLocaleTable)
    .values([
      {
        id: heroValue.id,
        locale: "en",
        value: {
          title: heroSectionTitleEn,
          text: heroSectionTextEn,
          image: { src: heroSectionImageSrc, alt: heroSectionImageAltEn },
        },
      },
      {
        id: heroValue.id,
        locale: "de",
        value: {
          title: heroSectionTitleDe,
          text: heroSectionTextDe,
          image: { src: heroSectionImageSrc, alt: heroSectionImageAltDe },
        },
      },
      {
        id: aboutValue.id,
        locale: "en",
        value: {
          title: aboutSectionTitleEn,
          text: aboutSectionTextEn,
        },
      },
      {
        id: aboutValue.id,
        locale: "de",
        value: {
          title: aboutSectionTitleDe,
          text: aboutSectionTextDe,
        },
      },
      {
        id: coachValue.id,
        locale: "en",
        value: {
          title: coachSectionTitleEn,
          text: coachSectionTextEn,
          image: { src: coachSectionImageSrc, alt: coachSectionImageAltEn },
        },
      },
      {
        id: coachValue.id,
        locale: "de",
        value: {
          title: coachSectionTitleDe,
          text: coachSectionTextDe,
          image: { src: coachSectionImageSrc, alt: coachSectionImageAltDe },
        },
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
