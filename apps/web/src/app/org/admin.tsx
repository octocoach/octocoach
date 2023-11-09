"use client";

import { Organization } from "@octocoach/db/schemas/common/organization";
import { SectionId } from "@octocoach/db/schemas/org/content";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import { useTransition } from "react";
import { deleteOrgAction } from "./actions";
import { Edit } from "./edit";

export interface SectionContent {
  id: SectionId;
  locale: Locales;
  value: unknown;
}

export default function Admin({
  organization,
  content,
}: {
  organization: Organization;
  content: SectionContent[];
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
        <Edit organization={organization} content={content} />
        <Button onPress={onDelete} disabled={isPending}>
          Delete
        </Button>
      </Stack>
    </Container>
  );
}
