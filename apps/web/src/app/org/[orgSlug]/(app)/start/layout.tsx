import { getServerSessionOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);

  const db = orgDb(params.orgSlug);

  const profile = await db.query.userProfileTable.findFirst({
    where: (table, { eq }) => eq(table.userId, session.user.id),
  });

  if (!profile?.termsAccepted) {
    redirect(`/org/${params.orgSlug}/signup`);
  }

  return <>{children}</>;
}