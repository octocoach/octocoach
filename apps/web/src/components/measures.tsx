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
import { jiggleClass } from "./measures.css";

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
                <FillImage
                  src={measure.imageSrc}
                  alt={measure.imageAlt}
                  minHeight={200}
                  roundedCorners
                />
                <Stack>
                  {measure.accredited && (
                    <Stack
                      direction="horizontal"
                      justify="between"
                      wrap
                      align="left"
                    >
                      <CertquaMeasureSeal />
                      <FundedByBA />
                    </Stack>
                  )}
                  <Text size="xl" variation="casual">
                    <Link href={href}>{measure.title}</Link>
                  </Text>
                  <Markdown>{measure.description}</Markdown>
                  <Stack direction="horizontal" justify="right">
                    <div className={jiggleClass}>
                      <ButtonLink href={href} Element={Link} glow size="large">
                        <Message id="measures.readMore" />
                      </ButtonLink>
                    </div>
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
