import { Measures } from "@components/measures";
import { getBaseUrl } from "@helpers/navigation";
import {
  AboutSection,
  CoachSection,
  FAQSection,
  HeroSection,
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
      <HeroSection content={content.hero} />
      <Measures measures={measures} baseUrl={baseUrl} />
      <AboutSection content={content.about} />
      <CoachSection content={content.coach} />
      <FAQSection content={content.faq} />
    </>
  );
}
