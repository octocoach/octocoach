import { mkAuth } from "@octocoach/auth";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

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
