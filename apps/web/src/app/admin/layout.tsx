import { superAdminUser } from "@app/constants";
import { authOrRedirect } from "@helpers/auth";
import { SessionProvider } from "@octocoach/auth/react";
import { Box, Text } from "@octocoach/ui";
import LayoutClient from "./layout-client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authOrRedirect();

  if (!session.user || !(session.user.email === superAdminUser)) {
    return (
      <Box textAlign="center">
        <Text size="xl">Restricted!</Text>
      </Box>
    );
  }

  return (
    <SessionProvider session={session}>
      <LayoutClient>{children}</LayoutClient>
    </SessionProvider>
  );
}
