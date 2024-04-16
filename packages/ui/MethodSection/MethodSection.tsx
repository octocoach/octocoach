import {
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";

import { Box, Stack, Text } from "..";

export const methodSectionId: SectionId = "method";

export type MethodSectionContent = SectionContentWithSubSections;

export interface MethodSectionProps {
  content: MethodSectionContent;
}

const SubSection = ({
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
          {content.title}
        </Text>
        <Stack
          direction="horizontal"
          align="left"
          wrap
          justify="center"
          spacing="loose"
        >
          {content.subSections
            ? content.subSections.map(({ title, image, text }, i) => (
                <SubSection
                  key={i}
                  title={title}
                  src={image.src}
                  description={text}
                  alt={image.alt}
                />
              ))
            : null}
        </Stack>
      </Stack>
    </Box>
  );
};
