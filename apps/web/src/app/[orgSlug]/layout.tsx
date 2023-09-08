import { Container, Stack, Text } from "@octocoach/ui";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = { name: "tempfix" };

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
