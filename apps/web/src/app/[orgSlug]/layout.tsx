import { makeDb } from "@octocoach/db/src/connection";
import { Container, Stack, Text } from "@octocoach/ui";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = { name: params.orgSlug };

  const db = makeDb({ orgSlug: params.orgSlug });

  const members = await db.query.members.findMany({ with: {} });

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
