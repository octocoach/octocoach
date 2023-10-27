import { getServerSessionOrRedirect } from "@helpers/auth";
import { SessionProvider } from "@octocoach/auth/react";
import LayoutClient from "./layout-client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSessionOrRedirect();

  return (
    <SessionProvider session={session}>
      <LayoutClient>{children}</LayoutClient>
    </SessionProvider>
  );
}
