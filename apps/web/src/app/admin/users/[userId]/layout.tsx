import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { ReactNode } from "react";
import { UserSummary } from "./user-summary";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  const { user } = await getServerSession(mkAuthOptions());
  return (
    <Container element="section">
      <Stack spacing="loose">
        <Link href={`/admin/users/${params.userId}`}>
          <Text size="xl" weight="bold" variation="casual">
            {user.name}
          </Text>
        </Link>
        <UserSummary userId={user.id} />
        <div>{children}</div>
      </Stack>
    </Container>
  );
}
