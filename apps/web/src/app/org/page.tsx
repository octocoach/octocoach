import { getServerSessionOrRedirect } from "@helpers/auth";
import { db } from "@octocoach/db/connection";
import Admin from "./admin";
import { NewOrganization } from "./new-organization";

export default async function Page() {
  const session = await getServerSessionOrRedirect();
  const { user } = session;

  const organization = await db.query.organizationTable.findFirst({
    where: (organization, { eq }) => eq(organization.owner, user.id),
  });

  if (organization) return <Admin organization={organization} />;

  return <NewOrganization />;
}
