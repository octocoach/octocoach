import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ThemeContainer from "./theme-container";

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

  const session = await getServerSession(mkAuthOptions(params.orgSlug));

  return (
    <SessionProvider session={session}>
      <ThemeContainer organization={organization}>{children}</ThemeContainer>
    </SessionProvider>
  );
}
