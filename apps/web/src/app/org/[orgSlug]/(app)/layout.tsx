import { db } from "@octocoach/db/connection";
import { Container, Nav } from "@octocoach/ui";
import { headers } from "next/headers";
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

  const baseUrl = headers().get("x-base");

  return (
    <Container width="contained">
      <Nav organization={organization} href={baseUrl} />
      {children}
    </Container>
  );
}
