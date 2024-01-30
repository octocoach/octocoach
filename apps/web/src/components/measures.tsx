import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import Message from "@octocoach/i18n/src/react-message";
import { Box, ButtonLink, Markdown, Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";

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
      <Stack direction="horizontal" align="center" justify="center" wrap>
        {measures.map((measure) => (
          <Stack align="center" key={measure.id}>
            <Image
              src={measure.imageSrc}
              alt={measure.imageAlt}
              width={200}
              height={200}
            />
            <Text size="xl" variation="casual">
              {measure.title}
            </Text>
            <Markdown>{measure.description}</Markdown>
            <ButtonLink
              href={`${baseUrl}measures/${measure.slug}`}
              Element={Link}
              color="brand"
              size="small"
            >
              <Text>
                <Message id="measures.readMore" />
              </Text>
            </ButtonLink>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
