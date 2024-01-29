import { authOrRedirect } from "@helpers/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import { orgDb } from "@octocoach/db/connection";
import { Box, Grid, Text } from "@octocoach/ui";
import { Profile } from "./profile";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const session = await authOrRedirect(params.orgSlug);
  const userId = session.user.id;
  const userAccounts = await getUserAccounts(userId, params.orgSlug);

  const db = orgDb(params.orgSlug);

  const profile = await db.query.userProfileTable.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, params.orgSlug),
  });

  if (!organization) notFound();

  const allProvidersLinked = Object.values(userAccounts).every(
    ({ dbAccount }) => !!dbAccount
  );

  const profileComplete =
    profile?.firstName?.length && profile?.lastName?.length;

  return (
    <Box paddingX="none" paddingY="none" marginY="large">
      <Grid gap="extraLarge">
        <Box paddingX="none">
          <Text size="xl" weight="extraBold">
            Welcome to {organization.displayName}
          </Text>
          <Text weight="light">Glad you are here!</Text>
        </Box>
        <Profile orgSlug={params.orgSlug} profile={profile} />
      </Grid>
    </Box>
  );
}
