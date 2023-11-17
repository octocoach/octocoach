import { getServerSessionOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { mkCoachTable } from "@octocoach/db/schemas/org/coach";
import { Box, Text } from "@octocoach/ui";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);

  const db = orgDb(params.orgSlug);
  const coachTable = mkCoachTable(params.orgSlug);

  const coach = await db.query.coachTable.findFirst({
    where: eq(coachTable.userId, session.user.id),
  });

  if (!coach) {
    return (
      <Box>
        <Text size="l">This area is only available to coaches</Text>
      </Box>
    );
  }

  return <>{children}</>;
}
