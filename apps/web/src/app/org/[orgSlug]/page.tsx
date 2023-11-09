"use client";

import { Faq } from "@components/Faq";
import { useSession } from "@octocoach/auth/react";
import {
  AboutSection,
  AboutSectionContent,
  Box,
  CoachSection,
  CoachSectionContent,
  HeroSection,
  HeroSectionContent,
  PixelBackground,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
} from "@octocoach/ui";
import { getContentById } from "@octocoach/ui/helpers";
import { StaticImageData } from "next/image";
import { useState } from "react";
import discover from "./_images/discover.png";
import grow from "./_images/grow.png";
import thrive from "./_images/thrive.png";
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

  const heroSection = getContentById<HeroSectionContent>(
    organization.content,
    heroSectionId
  );

  const aboutSection = getContentById<AboutSectionContent>(
    organization.content,
    aboutSectionId
  );

  const coachSection = getContentById<CoachSectionContent>(
    organization.content,
    coachSectionId
  );

  return (
    <>
      <PixelBackground>
        <HeroSection
          content={heroSection}
          orgSlug={params.orgSlug}
          signedIn={!!session?.user}
        />
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
        <AboutSection content={aboutSection} />
      </PixelBackground>
      <PixelBackground pixelSize={80}>
        <CoachSection content={coachSection} />
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
