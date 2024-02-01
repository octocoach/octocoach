import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Markdown, Text } from "@octocoach/ui";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Card } from "@octocoach/ui/Card/Card";
import Link from "next/link";
import { FillImage } from "./fill-image";

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
        {measures.map((measure) => (
          <Card key={measure.id}>
            <Grid columns="auto" gap="large">
              <FillImage
                src={measure.imageSrc}
                alt={measure.imageAlt}
                minHeight={200}
              />
              <Stack>
                <Text size="xl" variation="casual">
                  {measure.title}
                </Text>
                <Markdown>{measure.description}</Markdown>
                <Stack fullWidth align="right">
                  <ButtonLink
                    href={`${baseUrl}measures/${measure.slug}`}
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
        ))}
      </Stack>
    </Box>
  );
};
