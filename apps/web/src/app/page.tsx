import UserAccounts from "@components/user-accounts";
import { getServerSession } from "@octocoach/auth";
import { getUserAccounts } from "@octocoach/auth/adapters";
import mkAuthOptions from "@octocoach/auth/next-auth-config";

export default async function Page() {
  const session = await getServerSession(mkAuthOptions());

  const userAccounts = await getUserAccounts(session?.user?.id);

  return (
    <main
      style={{
        height: "calc(100vh - 40px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <UserAccounts accounts={userAccounts} />
    </main>
  );
}
