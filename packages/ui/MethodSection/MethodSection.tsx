import { Box } from "@carbon/icons-react";
import {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";

export const methodSectionId: SectionId = "method";

export type MethodSectionContent = SectionContentWithImage[];

export interface MethodSectionProps {
  content: MethodSectionContent;
}

const Section = ({
  title,
  description,
  src,
  alt,
}: {
  title: string;
  description: string;
  src: string;
  alt: string;
}) => (
  <Stack align="center" spacing="tight">
    <img
      src={src}
      height={200}
      width={200}
      alt={alt}
      style={{ imageRendering: "pixelated" }}
    />

    <Text element="h2" size="xl" variation="casual" weight="semiBold">
      {title}
    </Text>

    <Text width={200} textAlign="center">
      {description}
    </Text>
  </Stack>
);

export const MethodSection = ({ content }: MethodSectionProps) => {
  return (
    <Box>
      <Stack spacing="loose" align="center">
        <Text size="l" weight="light">
          Our Method
        </Text>
        <Stack
          direction="horizontal"
          align="left"
          wrap
          justify="center"
          spacing="loose"
        >
          {content.map(({ title, image, text }) => (
            <Section
              title={title}
              src={image.src}
              description={text}
              alt={image.alt}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
