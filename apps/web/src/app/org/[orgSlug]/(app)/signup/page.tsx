import { getServerSessionOrRedirect } from "@helpers/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import { orgDb } from "@octocoach/db/connection";
import { Button, Stack } from "@octocoach/ui";
import LinkAccounts from "./link-accounts";
import { Profile } from "./profile";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);
  const userId = session.user.id;
  const userAccounts = await getUserAccounts(userId, params.orgSlug);

  const db = orgDb(params.orgSlug);

  const profile = await db.query.userProfileTable.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  const allProvidersLinked = Object.values(userAccounts).every(
    ({ dbAccount }) => !!dbAccount
  );

  const profileComplete =
    profile?.firstName?.length > 0 && profile?.lastName?.length > 0;

  return (
    <Stack>
      <LinkAccounts accounts={userAccounts} />
      <Profile orgSlug={params.orgSlug} profile={profile} />
      {profileComplete && <Button>Continue</Button>}
    </Stack>
  );
}
