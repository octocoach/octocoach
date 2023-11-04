import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { Container, Nav } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import logo from "./_images/logo.svg";
import { OrganizationProvider } from "./context";
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
  });

  if (!organization) {
    notFound();
  }

  const session = await getServerSession(mkAuthOptions(params.orgSlug));

  return (
    <SessionProvider session={session}>
      <ThemeContainer organization={organization}>
        <Container width="contained">
          <Nav logoSrc={logo.src} displayName={organization.displayName} />

          <OrganizationProvider organization={organization}>
            {children}
          </OrganizationProvider>
        </Container>
      </ThemeContainer>
    </SessionProvider>
  );
}
