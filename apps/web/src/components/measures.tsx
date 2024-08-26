import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Markdown, Text } from "@octocoach/ui";
import { Card } from "@octocoach/ui/Card/Card";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Stack } from "@octocoach/ui/Stack/Stack";
import Link from "next/link";

import { CertquaOrgSeal } from "./certqua-seal/organization";
import { FillImage } from "./fill-image";
import { FundedByBA } from "./funded-by-ba";

export const Measures = ({
  measures,
  baseUrl,
}: {
  measures: MeasureWithInfo[];
  baseUrl: string;
}) => {
  if (measures.length === 0) return null;

  return (
    <Box paddingY="medium">
      <Stack spacing="loose">
        <Stack>
          <Text element="h2" size="l" weight="bold">
            <Message id="measures.heading" />
          </Text>
          <Grid columns="auto" gap="large" placeItems="center">
            <Text variation="casual" weight="light" size="l">
              <Message id="measures.intro" />
            </Text>

            <CertquaOrgSeal />
          </Grid>
        </Stack>
        <Stack>
          {measures.map((measure) => {
            const href = `${baseUrl}measures/${measure.id}`;
            return (
              <Card key={measure.id}>
                <Grid columns="auto" gap="large">
                  <FillImage
                    src={measure.imageSrc}
                    alt={measure.imageAlt}
                    minHeight={200}
                    roundedCorners
                  />
                  <Stack>
                    <Text size="xl" variation="casual">
                      <Link href={href}>{measure.title}</Link>
                    </Text>
                    <Markdown>{measure.description}</Markdown>
                    <Stack direction="horizontal" justify="right">
                      {measure.accredited && <FundedByBA />}
                      <ButtonLink
                        href={href}
                        Element={Link}
                        size="large"
                        animation="pulse"
                      >
                        <Message id="measures.readMore" />
                      </ButtonLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
