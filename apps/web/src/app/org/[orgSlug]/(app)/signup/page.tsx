import { authOrRedirect } from "@helpers/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import { orgDb } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Box, Grid, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";
import { Profile } from "./profile";

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
            <Message
              id="signup.title"
              params={{ name: organization.displayName }}
            />
          </Text>
          <Text weight="light">
            <Message id="signup.subTitle" />
          </Text>
        </Box>
        <Profile orgSlug={params.orgSlug} profile={profile} />
      </Grid>
    </Box>
  );
}
