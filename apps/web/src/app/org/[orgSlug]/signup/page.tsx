import { getServerSessionOrRedirect } from "@helpers/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import LinkAccounts from "./link-accounts";
import { Card, Form, FormField, FormInput, Stack, Text } from "@octocoach/ui";
import { Profile } from "./profile";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);
  const userId = session.user.id;
  const userAccounts = await getUserAccounts(userId, params.orgSlug);

  const allProvidersLinked = Object.values(userAccounts).every(
    ({ dbAccount }) => !!dbAccount
  );

  return (
    <Stack>
      <LinkAccounts accounts={userAccounts} />
      <Profile orgSlug={params.orgSlug} />
    </Stack>
  );
}
