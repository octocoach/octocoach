import { Measures } from "@components/measures";
import { getBaseUrl } from "@helpers/navigation";
import {
  AboutSection,
  CoachSection,
  FAQSection,
  HeroSection,
  PixelBackground,
} from "@octocoach/ui";
import { getContent, getMeasuresWithInfo } from "./helpers";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const content = await getContent(params.orgSlug);
  const measures = await getMeasuresWithInfo(params.orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <>
      <PixelBackground>
        <HeroSection content={content.hero} />
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
