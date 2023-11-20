import { db } from "@octocoach/db/connection";
import { Container, Nav } from "@octocoach/ui";
import { ReactNode } from "react";

export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { orgSlug: string };
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, params.orgSlug),
  });

  return (
    <Container width="contained">
      <Nav organization={organization} />
      {children}
    </Container>
  );
}