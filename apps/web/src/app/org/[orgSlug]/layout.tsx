import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { Box, Container, PixelBackground, Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";
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
        <Container>
          <PixelBackground>
            <Link href={`/org/${organization.slug}`}>
              <Stack direction="horizontal" align="center">
                <Image src={logo} height={64} width={64} alt="Q15 Logo" />{" "}
                <Text size="xl" weight="extraBold">
                  Q15
                </Text>
              </Stack>
            </Link>
          </PixelBackground>

          <OrganizationProvider organization={organization}>
            {children}
          </OrganizationProvider>
        </Container>
      </ThemeContainer>
    </SessionProvider>
  );
}
