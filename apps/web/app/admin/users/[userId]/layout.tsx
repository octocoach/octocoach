import { clerkClient } from "@clerk/nextjs";
import { UserSummary } from "@components/user-summary";
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
  const user = await clerkClient.users.getUser(params.userId);
  return (
    <Container element="section">
      <Stack spacing="loose">
        <Link href={`/admin/users/${params.userId}`}>
          <Text size="xl" weight="bold" variation="casual">
            {user.firstName} {user.lastName}
          </Text>
        </Link>
        <UserSummary userId={user.id} />
        <div>{children}</div>
      </Stack>
    </Container>
  );
}
