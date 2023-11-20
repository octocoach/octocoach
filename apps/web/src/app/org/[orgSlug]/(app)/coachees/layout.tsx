import { getServerSessionOrRedirect } from "@helpers/auth";
import { isCoach } from "@octocoach/auth";
import { Box, Text } from "@octocoach/ui";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);

  if (!(await isCoach(session.user.id, params.orgSlug))) {
    return (
      <Box>
        <Text size="l">This area is only available to coaches</Text>
      </Box>
    );
  }

  return <>{children}</>;
}
