"use client";

import {
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "../Box/Box";
import { Stack } from "../Stack/Stack";
import { Grid } from "../Grid/Grid";
import { Text } from "../Text/Text";
import { Card } from "../Card/Card";
import { Center } from "../Center/Center";
import { ElementType } from "react";

export const testimonialsSectionId: SectionId = "testimonials";

export type TestimonialsSectionContent = SectionContentWithSubSections;

export interface TestimonialsSectionProps {
  content: TestimonialsSectionContent;
  Image: ElementType;
}

const Testimonial = ({
  content,
  Image,
}: {
  content: TestimonialsSectionContent["subSections"][number];
  Image: ElementType;
}) => {
  return (
    <Card>
      <Grid columns="auto" gap="large">
        <Center>
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={200}
            height={200}
          />
        </Center>
        <Stack>
          <Text>
            <q>{content.text}</q>
          </Text>

          <Text size="l" weight="medium" variation="casual" textAlign="right">
            - {content.title}
          </Text>
        </Stack>
      </Grid>
    </Card>
  );
};

export const TestimonialsSection = ({
  content,
  Image,
}: TestimonialsSectionProps) => {
  return (
    <Box>
      <Stack spacing="loose">
        <Text size="l" weight="light">
          {content.title}
        </Text>
        <Stack>
          {content.subSections.map((s, key) => (
            <Testimonial content={s} key={key} Image={Image} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
