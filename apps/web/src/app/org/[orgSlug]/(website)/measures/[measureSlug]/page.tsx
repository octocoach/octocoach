import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import {
  Box,
  ButtonLink,
  Card,
  Grid,
  Markdown,
  Stack,
  Text,
} from "@octocoach/ui";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeasureWithInfoAndModules } from "../../helpers";
import { getBaseUrl } from "@helpers/navigation";
import Message from "@octocoach/i18n/src/react-message";

const ApplyButton = ({ baseUrl, slug }: { baseUrl: string; slug: string }) => (
  <Box paddingY="medium">
    <Stack fullWidth align="center">
      <ButtonLink
        Element={Link}
        href={`${baseUrl}measures/${slug}/apply`}
        color="brand"
        size="large"
      >
        <Message id="enrollment.applyNow" />
      </ButtonLink>
    </Stack>
  </Box>
);

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
        <Grid gap="large" columns="auto" justifyItems="center">
          <Box>
            <Image
              src={measure.imageSrc}
              alt={measure.imageAlt}
              width={200}
              height={200}
            />
          </Box>
          <Box>
            <Text size="xl" variation="casual">
              {measure.title}
            </Text>
            <Markdown>{measure.description}</Markdown>
          </Box>
        </Grid>
        <ApplyButton baseUrl={baseUrl} slug={measure.slug} />
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.modules" />
        </Text>
        <Stack>
          {measure.modules.map((mod) => (
            <Card key={mod.id}>
              <Grid gap="large" columns="auto" justifyItems="center">
                <Image
                  src={mod.imageSrc}
                  alt={mod.imageAlt}
                  height={150}
                  width={150}
                />
                <Stack fullWidth>
                  <Text size="l" weight="heavy">
                    {mod.title}
                  </Text>
                  <Text>{mod.description}</Text>
                </Stack>
              </Grid>
            </Card>
          ))}
        </Stack>
        <Text size="l" weight="light" element="h2">
          <Message id="enrollment.requirements" />
        </Text>
        <Card>
          <Markdown>{measure.requirements}</Markdown>
        </Card>
        <ApplyButton baseUrl={baseUrl} slug={measure.slug} />
      </Stack>
    </Box>
  );
}
