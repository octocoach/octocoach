"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useTransition } from "react";
import { deleteOrgAction } from "./actions";
import { Edit } from "./edit";

export default function Admin({
  organization,
}: {
  organization: Organization;
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
        <Button onPress={onDelete} disabled={isPending}>
          Delete
        </Button>
      </Stack>
    </Container>
  );
}
