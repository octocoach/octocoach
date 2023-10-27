import { getServerSessionOrRedirect } from "@helpers/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import LinkAccounts from "./link-accounts";

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

  if (allProvidersLinked) return <p>All Providers Linked</p>;

  return <LinkAccounts accounts={userAccounts} />;
}
