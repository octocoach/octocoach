import { authOrRedirect } from "@helpers/auth";
import { Text } from "@octocoach/ui";
import type { ReactNode } from "react";

import type { Params } from "../../types";

export default async function Layout({
  children,
  params: { orgSlug },
}: Params & {
  children: ReactNode;
}) {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.isCoach)
    return <Text>You are not authorized to view this page</Text>;

  return <>{children}</>;
}
