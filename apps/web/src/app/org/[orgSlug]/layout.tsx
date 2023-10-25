import { db } from "@octocoach/db/connection";
import { Container, Stack, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ThemeContainer from "./theme-container";

export default async function Layout({
  children,
  userAccount,
  params,
}: {
  children: ReactNode;
  userAccount: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
  });

  if (!organization) {
    notFound();
  }

  return (
    <ThemeContainer organization={organization}>
      <Container element="main">
        <Stack>
          <Text size="l" variation="casual">
            {organization.displayName}
          </Text>
          {userAccount}
          <Container element="section">{children}</Container>
        </Stack>
      </Container>
    </ThemeContainer>
  );
}
