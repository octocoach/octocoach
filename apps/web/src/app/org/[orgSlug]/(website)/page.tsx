import { getBaseUrl } from "@helpers/navigation";
import { mkAuth } from "@octocoach/auth";
import {
  AboutSection,
  CoachSection,
  FAQSection,
  HeroSection,
  PixelBackground,
} from "@octocoach/ui";
import Link from "next/link";
import { getContent, getMeasuresWithInfo } from "./helpers";
import { Measures } from "@components/measures";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const { auth } = await mkAuth(params.orgSlug);
  const session = await auth();

  const content = await getContent(params.orgSlug);
  const measures = await getMeasuresWithInfo(params.orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <>
      <PixelBackground>
        <HeroSection
          content={content.hero}
          signedIn={!!session?.user}
          startLink={<Link href={`${baseUrl}/start`} />}
          signupLink={<Link href={`${baseUrl}/signup`} />}
        />
      </PixelBackground>
      <PixelBackground pixelSize={30}>
        <Measures measures={measures} baseUrl={baseUrl} />
      </PixelBackground>
      <PixelBackground pixelSize={40}>
        <AboutSection content={content.about} />
      </PixelBackground>
      <PixelBackground pixelSize={80}>
        <CoachSection content={content.coach} />
      </PixelBackground>
      <PixelBackground pixelSize={120}>
        <FAQSection content={content.faq} />
      </PixelBackground>
    </>
  );
}
