"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { SectionWithLocale } from "@octocoach/db/schemas/org/content";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useTransition } from "react";
import { deleteOrgAction } from "./actions";
import { Edit } from "./edit";
import { EditContent } from "./edit-content";

export default function Admin({
  organization,
  content,
}: {
  organization: Organization;
  content: SectionWithLocale[];
}) {
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    await startTransition(async () => {
      deleteOrgAction(organization);
    });
  }
  return (
    <Container element="section">
      <Text size="l">{organization.displayName}</Text>
      <Stack>
        <Edit organization={organization} />
        <EditContent content={content} slug={organization.slug} />
        <Button onPress={onDelete} disabled={isPending}>
          Delete
        </Button>
      </Stack>
    </Container>
  );
}
