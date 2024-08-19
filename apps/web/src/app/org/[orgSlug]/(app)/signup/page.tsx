import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Box, Grid, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";

import type { Params } from "../../types";
import { Profile } from "./profile";

export default async function Page({ params: { orgSlug } }: Params) {
  const session = await authOrRedirect(orgSlug);
  const userId = session.user.id;

  const db = orgDb(orgSlug);

  const profile = await db.query.userProfileTable.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  if (!organization) notFound();

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
        <Profile orgSlug={orgSlug} profile={profile} />
      </Grid>
    </Box>
  );
}
