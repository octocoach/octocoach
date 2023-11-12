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
  MethodSection,
  MethodSectionContent,
  PixelBackground,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
  methodSectionId,
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

  const methodSection = getContentById<MethodSectionContent>(
    organization.content,
    methodSectionId
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
        <MethodSection content={methodSection} />
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
