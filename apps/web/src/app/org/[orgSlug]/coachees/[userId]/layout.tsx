import { trpc } from "@octocoach/trpc/src/client";
import { Container, Stack } from "@octocoach/ui";
import { ReactNode } from "react";
import { UserSummary } from "./user-summary";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string; userId: string };
}) {
  return (
    <Container element="section">
      <Stack>
        <UserSummary userId={params.userId} />
        <div>{children}</div>
      </Stack>
    </Container>
  );
}
