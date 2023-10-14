import { db, orgDb } from "@octocoach/db/connection";
import { Container, Stack, Text } from "@octocoach/ui";
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
  });

  if (!organization) {
    notFound();
  }

  const members = await orgDb(params.orgSlug).query.userTable.findMany({
    with: {},
  });

  return (
    <Container element="main">
      <Stack>
        <Text size="l" variation="casual">
          {organization.displayName}
        </Text>

        <Container element="section">{children}</Container>
      </Stack>
    </Container>
  );
}
