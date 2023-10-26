import { withAuth } from "@components/withAuth";
import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { db } from "@octocoach/db/connection";
import Admin from "./admin";
import { NewOrganization } from "./new-organization";

export default withAuth(Page);

async function Page() {
  const { user } = await getServerSession(mkAuthOptions());

  const organization = await db.query.organizationTable.findFirst({
    where: (organization, { eq }) => eq(organization.owner, user.id),
  });

  if (organization) return <Admin organization={organization} />;

  return <NewOrganization />;
}
