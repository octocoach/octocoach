import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Markdown, Text } from "@octocoach/ui";
import { Card } from "@octocoach/ui/Card/Card";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Stack } from "@octocoach/ui/Stack/Stack";
import Link from "next/link";
import { CertquaMeasureSeal } from "./certqua-seal/measure";
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
      <Stack>
        {measures.map((measure) => {
          const href = `${baseUrl}measures/${measure.id}`;
          return (
            <Card key={measure.id}>
              <Grid columns="auto" gap="large">
                <Link href={href}>
                  <FillImage
                    src={measure.imageSrc}
                    alt={measure.imageAlt}
                    minHeight={200}
                    roundedCorners
                  />
                </Link>
                <Stack>
                  {measure.accredited && (
                    <Stack direction="horizontal" justify="right">
                      <FundedByBA />
                    </Stack>
                  )}
                  <Text size="xl" variation="casual">
                    <Link href={href}>{measure.title}</Link>
                  </Text>
                  <Markdown>{measure.description}</Markdown>
                  <Stack
                    direction="horizontal"
                    align="center"
                    justify={measure.accredited ? "around" : "right"}
                    wrap
                  >
                    {measure.accredited && <CertquaMeasureSeal />}
                    <ButtonLink
                      href={href}
                      Element={Link}
                      glow
                      color="contrast"
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
    </Box>
  );
};
