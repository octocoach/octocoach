"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { ContentLocale } from "@octocoach/db/schemas/org/content";
import { Button, Card, Container, Stack, Text } from "@octocoach/ui";
import { useTransition } from "react";
import { deleteOrgAction } from "./actions";
import { Edit } from "./edit";
import { EditContent } from "./edit-content";
import { EditMission } from "./edit-mission";
import { EditDomain } from "./edit-domain";

export default function Admin({
  organization,
  content,
}: {
  organization: Organization;
  content: ContentLocale[];
}) {
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    await startTransition(() => {
      deleteOrgAction(organization);
    });
  }
  return (
    <Container element="section">
      <Text size="l">{organization.displayName}</Text>
      <Stack>
        <Edit organization={organization} />
        <EditContent content={content} slug={organization.slug} />
        <EditMission content={content} slug={organization.slug} />
        <EditDomain organization={organization} />
        <Card>
          <Button onClick={onDelete} disabled={isPending} color="error">
            Delete
          </Button>
        </Card>
      </Stack>
    </Container>
  );
}
