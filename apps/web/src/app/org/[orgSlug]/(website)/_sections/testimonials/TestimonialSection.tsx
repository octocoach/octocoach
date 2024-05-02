"use client";

import {
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "@octocoach/ui/Box/Box";
import { Card } from "@octocoach/ui/Card/Card";
import { Center } from "@octocoach/ui/Center/Center";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";
import Image from "next/image";

export const testimonialsSectionId: SectionId = "testimonials";

export type TestimonialsSectionContent = SectionContentWithSubSections;

export interface TestimonialsSectionProps {
  content: TestimonialsSectionContent;
}
interface TestimonialProps {
  content: TestimonialsSectionContent["subSections"][number];
}

const Testimonial = ({ content }: TestimonialProps) => {
  return (
    <Card>
      <Grid columns="auto" gap="large">
        <Center>
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={200}
            height={200}
            style={{ imageRendering: "pixelated" }}
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

export const TestimonialsSection = ({ content }: TestimonialsSectionProps) => {
  return (
    <Box>
      <Text size="l" weight="light">
        {content.title}
      </Text>
      <Stack>
        {content.subSections.map((s, idx) => (
          <Testimonial content={s} key={idx} />
        ))}
      </Stack>
    </Box>
  );
};
