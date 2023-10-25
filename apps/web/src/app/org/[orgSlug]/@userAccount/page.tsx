import { getServerSession } from "@octocoach/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import UserAccount from "./client";

export default async function UserAccountServer({
  orgSlug,
}: {
  orgSlug: string;
}) {
  const session = await getServerSession(mkAuthOptions(orgSlug));
  const userAccounts = await getUserAccounts(session?.user?.id);

  return <UserAccount accounts={userAccounts} />;
}
