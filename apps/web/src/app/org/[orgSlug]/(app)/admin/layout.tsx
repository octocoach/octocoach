import { authOrRedirect } from "@helpers/auth";
import { Text } from "@octocoach/ui";
import type { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const { user } = await authOrRedirect(params.orgSlug);

  if (!user.isCoach)
    return <Text>You are not authorized to view this page</Text>;

  return <>{children}</>;
}
