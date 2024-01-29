import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import { Box, ButtonLink, Card, Markdown, Stack, Text } from "@octocoach/ui";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeasureWithInfoAndModules } from "../../helpers";
import { getBaseUrl } from "@helpers/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; measureSlug: MeasureWithInfo["slug"] };
}) {
  const measure = await getMeasureWithInfoAndModules(
    params.orgSlug,
    params.measureSlug
  );

  if (!measure) notFound();

  const baseUrl = getBaseUrl();

  return (
    <Box marginY="medium">
      <Stack>
        <Stack direction="horizontal" justify="between" wrap>
          <Stack spacing="loose">
            <Box>
              <Text size="xl" variation="casual">
                {measure.title}
              </Text>
              <Text>{measure.description}</Text>
            </Box>
            <ButtonLink
              Element={Link}
              text="Apply now"
              href={`${baseUrl}measures/${measure.slug}/apply`}
            />
          </Stack>
          <Image
            src={measure.imageSrc}
            alt={measure.imageAlt}
            width={200}
            height={200}
          />
        </Stack>
        <Text size="l" weight="light" element="h2">
          Modules
        </Text>
        <Stack>
          {measure.modules.map((mod) => (
            <Card key={mod.id}>
              <Stack direction="horizontal">
                <Image
                  src={mod.imageSrc}
                  alt={mod.imageAlt}
                  height={150}
                  width={150}
                />
                <Stack>
                  <Text size="l" weight="heavy">
                    {mod.title}
                  </Text>
                  <Text>{mod.description}</Text>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
        <Text size="l" weight="light" element="h2">
          Requirements
        </Text>
        <Card>
          <Markdown>{measure.requirements}</Markdown>
        </Card>
      </Stack>
    </Box>
  );
}
