import { getServerSession } from "@octocoach/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import UserAccount from "./client";

export default async function UserAccountServer({
  params,
}: {
  params: {
    orgSlug: string;
  };
}) {
  const session = await getServerSession(mkAuthOptions(params.orgSlug));
  if (!session?.user) return null;

  const userId = session.user.id;
  const userAccounts = await getUserAccounts(userId, params.orgSlug);

  return <UserAccount accounts={userAccounts} />;
}
