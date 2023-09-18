import { db, orgDb } from "@octocoach/db/src/connection";
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
  const organization = await db.query.organizations.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
  });

  if (!organization) {
    notFound();
  }

  const members = await orgDb(params.orgSlug).query.members.findMany({
    with: {},
  });

  return (
    <Container element="main">
      <Stack>
        <Text size="l" variation="casual">
          {organization.name}
        </Text>
        <div>
          {members.map(({ id }) => (
            <p key={id}>{id}</p>
          ))}
        </div>
        <Container element="section">{children}</Container>
      </Stack>
    </Container>
  );
}
