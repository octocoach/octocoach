import { SectionContentSimple } from "@octocoach/db/schemas/org/content";
import {
  Card,
  Container,
  Markdown,
  PixelBackground,
  Text,
} from "@octocoach/ui";
import { notFound } from "next/navigation";

import type { Params } from "../../types";
import { getContentById } from "../helpers";

export default async function Page({ params: { orgSlug } }: Params) {
  const missionContent = await getContentById<SectionContentSimple>(
    orgSlug,
    "mission"
  );

  if (!missionContent) notFound();

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
