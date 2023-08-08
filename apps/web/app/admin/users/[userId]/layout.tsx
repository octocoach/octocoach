import { clerkClient } from "@clerk/nextjs";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  const clerkUser = await clerkClient.users.getUser(params.userId);
  return (
    <Container element="section">
      <Stack spacing="loose">
        <Link href={`/admin/users/${params.userId}`}>
          <Text size="xl" weight="bold" variation="casual">
            {clerkUser.firstName} {clerkUser.lastName}
          </Text>
        </Link>

        <div>{children}</div>
      </Stack>
    </Container>
  );
}
