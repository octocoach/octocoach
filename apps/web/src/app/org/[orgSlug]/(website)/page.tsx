"use client";

import { useSession } from "@octocoach/auth/react";
import {
  AboutSection,
  AboutSectionContent,
  CoachSection,
  CoachSectionContent,
  FAQSection,
  FaqSectionContent,
  HeroSection,
  HeroSectionContent,
  MethodSection,
  MethodSectionContent,
  PixelBackground,
  aboutSectionId,
  coachSectionId,
  faqSectionId,
  heroSectionId,
  methodSectionId,
} from "@octocoach/ui";
import { getContentById } from "@octocoach/ui/helpers";
import Link from "next/link";
import { useOrganization } from "./context";

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();
  const organization = useOrganization();

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

  const faqSection = getContentById<FaqSectionContent>(
    organization.content,
    faqSectionId
  );

  const baseUrl =
    typeof window !== "undefined" && window.location.hostname === "octo.coach"
      ? `/org/${params.orgSlug}`
      : "";

  return (
    <>
      <PixelBackground>
        <HeroSection
          content={heroSection}
          orgSlug={params.orgSlug}
          signedIn={!!session?.user}
          startLink={<Link href={`${baseUrl}/start`} />}
          signupLink={<Link href={`${baseUrl}/signup`} />}
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
      <PixelBackground pixelSize={120}>
        <FAQSection content={faqSection} />
      </PixelBackground>
    </>
  );
}
