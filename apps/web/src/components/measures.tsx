import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";
import { Box, ButtonLink, Stack, Text } from "@octocoach/ui";
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
      <Text size="l" weight="light" textAlign="center">
        Training Measures
      </Text>
      <Stack direction="horizontal" align="center" justify="center" wrap>
        {measures.map((measure) => (
          <Stack justify="center" align="center" key={measure.id}>
            <Image
              src={measure.imageSrc}
              alt={measure.imageAlt}
              width={200}
              height={200}
            />
            <Text size="xl" variation="casual">
              {measure.title}
            </Text>
            <Text>{measure.description}</Text>
            <ButtonLink
              href={`${baseUrl}/measures/${measure.slug}`}
              text="Read More"
              Element={Link}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
