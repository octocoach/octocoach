import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { LinkAccount } from "./link-account";
import { RefreshToken } from "./refresh-token";
import { refreshGoogleToken } from "@octocoach/auth/helpers/oauth";
import { GetEvents } from "./get-events";

export default async function Page({
  params: { orgSlug },
}: {
  params: { orgSlug: string };
}) {
  const { user } = await authOrRedirect(orgSlug);

  if (!user.email)
    throw new Error(`User ${user.id} is missing an email address`);

  const db = orgDb(orgSlug);
  const { accountTable } = mkOrgSchema(orgSlug);

  const googleAccounts = await db
    .select()
    .from(accountTable)
    .where(
      and(eq(accountTable.userId, user.id), eq(accountTable.provider, "google"))
    )
    .then((rows) => rows[0] ?? null);

  return (
    <Stack>
      <LinkAccount />
      <RefreshToken
        refreshGoogleToken={refreshGoogleToken.bind(null, {
          userId: user.id,
          orgSlug,
        })}
      />
      <GetEvents userId={user.id} userEmail={user.email} orgSlug={orgSlug} />
    </Stack>
  );
}
