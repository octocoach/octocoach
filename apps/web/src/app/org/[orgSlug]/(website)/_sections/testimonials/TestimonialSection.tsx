"use client";

import * as Scrollytelling from "@bsmnt/scrollytelling";
import {
  SectionContentWithSubSections,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "@octocoach/ui/Box/Box";
import { Card } from "@octocoach/ui/Card/Card";
import { Center } from "@octocoach/ui/Center/Center";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { ChevronDown } from "@octocoach/ui/icons";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { bounce, pinClass, wordClass } from "./testimonial.css";

export const testimonialsSectionId: SectionId = "testimonials";

export type TestimonialsSectionContent = SectionContentWithSubSections;

export interface TestimonialsSectionProps {
  content: TestimonialsSectionContent;
}
interface TestimonialProps {
  content: TestimonialsSectionContent["subSections"][number];
}

const splitText = (text: string) => {
  const words = text.split(" ");

  return words.map((word, i) => (
    <span key={i} className={wordClass}>
      {word}
      {i !== words.length - 1 ? " " : ""}
    </span>
  ));
};

const Testimonial = ({ content }: TestimonialProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(350);

  useEffect(() => {
    const refreshClientHeight = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    };

    refreshClientHeight();

    window.addEventListener("resize", refreshClientHeight);
    return () => {
      window.removeEventListener("resize", refreshClientHeight);
    };
  }, []);

  return (
    <Scrollytelling.Root debug={false}>
      <Scrollytelling.Pin
        childHeight={height}
        pinSpacerHeight={height * 10}
        top={80}
        pinSpacerClassName={pinClass}
      >
        <div ref={ref}>
          <Stack justify="center" spacing="loose" align="center">
            <Card>
              <Grid columns="auto" gap="large">
                <Center>
                  <Scrollytelling.Animation
                    tween={{
                      start: 0,
                      end: 100,
                      fromTo: [{ borderRadius: 100 }, { borderRadius: 6 }],
                    }}
                  >
                    <Image
                      src={content.image.src}
                      alt={content.image.alt}
                      width={200}
                      height={200}
                      style={{ imageRendering: "pixelated" }}
                    />
                  </Scrollytelling.Animation>
                </Center>
                <Stack>
                  <Text>
                    <q>
                      <Scrollytelling.Stagger
                        tween={{
                          start: 0,
                          end: 80,
                          fromTo: [
                            {
                              "--casl": 0,
                              fontWeight: 200,
                            },
                            {
                              "--casl": 1,
                              fontWeight: 400,
                            },
                          ],
                        }}
                      >
                        {splitText(content.text)}
                      </Scrollytelling.Stagger>
                    </q>
                  </Text>

                  <Text
                    size="l"
                    weight="medium"
                    variation="casual"
                    textAlign="right"
                  >
                    <Scrollytelling.Animation
                      tween={{
                        start: 80,
                        end: 90,
                        fromTo: [{ opacity: 0.2 }, { opacity: 1 }],
                      }}
                    >
                      <span>- {content.title}</span>
                    </Scrollytelling.Animation>
                  </Text>
                </Stack>
              </Grid>
            </Card>
            <ChevronDown size="32" className={bounce} />
          </Stack>
        </div>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
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
