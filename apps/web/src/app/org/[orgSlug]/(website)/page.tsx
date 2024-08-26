import { Measures } from "@components/measures";
import { getBaseUrl } from "@helpers/navigation";
import {
  AboutSection,
  FAQSection,
  HeroSection,
  TestimonialsSection,
} from "@sections/index";

import type { Params } from "../types";
import { getContent, getMeasuresWithInfo } from "./helpers";

export default async function Page({ params: { orgSlug } }: Params) {
  const content = await getContent(orgSlug);
  const measures = await getMeasuresWithInfo(orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <>
      <HeroSection content={content.hero} />
      <Measures measures={measures} baseUrl={baseUrl} />
      <TestimonialsSection content={content.testimonials} />
      <AboutSection content={content.about} />
      <FAQSection content={content.faq} />
    </>
  );
}
