import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { Container, Stack, Text } from "@octocoach/ui";
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
  });

  if (!organization) {
    notFound();
  }

  const session = await getServerSession(mkAuthOptions(params.orgSlug));

  return (
    <SessionProvider session={session}>
      <ThemeContainer organization={organization}>
        <Container element="main">
          <Stack>
            <Text size="l" variation="casual">
              {organization.displayName}
            </Text>
            <Container>{children}</Container>
          </Stack>
        </Container>
      </ThemeContainer>
    </SessionProvider>
  );
}
