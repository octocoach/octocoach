import { mkAuth } from "@octocoach/auth";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export async function generateMetadata({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}): Promise<Metadata> {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  if (!organization) {
    return {
      title: "OctoCoach",
    };
  }

  return {
    title: {
      default: organization.displayName,
      template: `%s | ${organization.displayName}`,
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
    with: {
      address: true,
      owner: true,
    },
  });

  if (!organization) {
    notFound();
  }

  const { auth } = await mkAuth(params.orgSlug);

  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
