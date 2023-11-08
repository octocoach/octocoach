"use client";

import { Faq } from "@components/Faq";
import { useSession } from "@octocoach/auth/react";
import {
  Box,
  Button,
  Grid,
  Markdown,
  PixelBackground,
  Stack,
  Tagline,
  Text,
} from "@octocoach/ui";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import coachImage from "./_images/coach2.png";
import discover from "./_images/discover.png";
import grow from "./_images/grow.png";
import thrive from "./_images/thrive.png";
import { about, coach } from "./content";
import { useOrganization } from "./context";

const Section = ({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: StaticImageData;
}) => (
  <Stack align="center" spacing="tight">
    <img
      src={src.src}
      height={200}
      width={200}
      alt={description}
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

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();
  const organization = useOrganization();

  const [openQA, setOpenQA] = useState<number | null>(null);

  const getCTA = () =>
    !session?.user ? (
      <Link href={`/org/${params.orgSlug}/signup`}>
        <Button>Sign Up</Button>
      </Link>
    ) : (
      <Link href={`/org/${params.orgSlug}/start`}>
        <Button>Start Debugging</Button>
      </Link>
    );

  type HeroSection = {
    title: string;
    text: string;
  };

  const heroSection = organization.content.find((c) => c.id === "hero");
  const heroSectionValue = heroSection.value as HeroSection;

  return (
    <>
      <PixelBackground>
        <Box paddingX="small">
          <Grid placeItems="center" gap="medium">
            <img
              src={heroSection.image.src}
              width={400}
              alt={heroSection.image.alt}
              style={{ imageRendering: "pixelated" }}
            />

            <Stack spacing="loose">
              <Stack spacing="tight">
                <Tagline>{heroSectionValue.title}</Tagline>
                <Markdown>{heroSectionValue.text}</Markdown>
              </Stack>
              <Box textAlign="center" paddingX="none">
                {getCTA()}
              </Box>
            </Stack>
          </Grid>
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={20}>
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
              <Section
                title="Discover"
                src={discover}
                description="Uncover your key interests, assess your current skills and identify areas for development to better align with your desired job in the tech industry."
              />
              <Section
                title="Grow"
                src={grow}
                description="Engage in personalized coaching, hands-on projects, and continuous feedback to bridge any skills gap, ensuring you're well-prepared and confident to tackle real-world challenges."
              />
              <Section
                title="Thrive"
                src={thrive}
                description="Secure a position that not only matches your skills and interests, but also propels you into a continuous learning and growth trajectory."
              />
            </Stack>
          </Stack>
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={40}>
        <Box paddingX="none">
          <Text element="h2" size="l" weight="bold">
            About Q15
          </Text>
          <Markdown>{about}</Markdown>
        </Box>
      </PixelBackground>
      <PixelBackground pixelSize={80}>
        <Box paddingX="none">
          <Stack align="center">
            <img
              src={coachImage.src}
              style={{
                imageRendering: "pixelated",
                width: "clamp(280px, 50%, 400px)",
                minWidth: 280,
              }}
              alt="Adriaan"
            />
            <Box paddingX="none">
              <Text element="h2" size="l" weight="bold">
                Meet the coach
              </Text>
              <Markdown>{coach}</Markdown>
            </Box>
          </Stack>
        </Box>
      </PixelBackground>
      <Box paddingX="none">
        <Text element="h2" size="l" weight="bold">
          FAQs
        </Text>
        <Stack>
          {[].map((qa, idx) => (
            <Faq
              key={qa.id}
              qa={qa}
              idx={idx}
              onOpen={(i) => {
                if (openQA === idx) {
                  setOpenQA(null);
                } else {
                  setOpenQA(i);
                }
              }}
              isOpen={idx === openQA}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
}
