import { MeasureWithInfoAndModules } from "@octocoach/db/schemas/org/measure";
import { Box, Stack, Text } from "@octocoach/ui";
import Image from "next/image";

export const Measures = ({
  measures,
}: {
  measures: MeasureWithInfoAndModules[];
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
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
