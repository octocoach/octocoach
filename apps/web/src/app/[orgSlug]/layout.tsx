import { ReactNode } from "react";
import { clerkClient } from "@clerk/nextjs";
import { Container, Stack, Text } from "@octocoach/ui";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await clerkClient.organizations.getOrganization({
    slug: params.orgSlug,
  });

  return (
    <Container element="main">
      <Stack>
        <Text size="l" variation="casual">
          {organization.name}
        </Text>
        <Container element="section">{children}</Container>
      </Stack>
    </Container>
  );
}
