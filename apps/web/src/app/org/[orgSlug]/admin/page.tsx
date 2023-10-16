import { orgDb } from "@octocoach/db/connection";
import { Container } from "@octocoach/ui";
import { Edit } from "./edit";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const db = orgDb(params.orgSlug);

  const organization = await db.query.organizationTable.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
  });

  return (
    <Container element="section">
      <Edit organization={organization} />
    </Container>
  );
}
