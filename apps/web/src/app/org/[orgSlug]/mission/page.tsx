"use client";

import { SectionContentSimple } from "@octocoach/db/schemas/org/content";
import {
  Card,
  Container,
  Markdown,
  PixelBackground,
  Text,
} from "@octocoach/ui";
import { getContentById } from "@octocoach/ui/helpers";
import { useOrganization } from "../context";

export default function Page({ params }: { params: { orgSlug: string } }) {
  const organization = useOrganization();

  const missionContent = getContentById<SectionContentSimple>(
    organization.content,
    "mission"
  );

  return (
    <PixelBackground pixelSize={80}>
      <Container>
        <Text size="xl">{missionContent.title}</Text>
        <Card>
          <Markdown>{missionContent.text}</Markdown>
        </Card>
      </Container>
    </PixelBackground>
  );
}
