"use client";

import { EditSection } from "@components/EditSection";
import Upload from "@components/Upload";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  AboutSectionContent,
  Box,
  Button,
  CoachSectionContent,
  Container,
  Form,
  FormField,
  FormInput,
  HeroSectionContent,
  HiddenInput,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
  useFormStore,
} from "@octocoach/ui";
import { filterContentByLocale, getContentById } from "@octocoach/ui/helpers";
import { onSubmit, type OrganizationDetails } from "./actions";
import { SectionContent } from "./admin";

export const Edit = ({
  organization,
  content,
}: {
  organization: Organization;
  content: SectionContent[];
}) => {
  const heroSectionEn = getContentById<HeroSectionContent>(
    filterContentByLocale(content, "en"),
    heroSectionId
  );
  const heroSectionDe = getContentById<HeroSectionContent>(
    filterContentByLocale(content, "de"),
    heroSectionId
  );

  const aboutSectionEn = getContentById<AboutSectionContent>(
    filterContentByLocale(content, "en"),
    aboutSectionId
  );

  const aboutSectionDe = getContentById<AboutSectionContent>(
    filterContentByLocale(content, "de"),
    aboutSectionId
  );

  const coachSectionEn = getContentById<CoachSectionContent>(
    filterContentByLocale(content, "en"),
    coachSectionId
  );

  const coachSectionDe = getContentById<CoachSectionContent>(
    filterContentByLocale(content, "de"),
    coachSectionId
  );

  const store = useFormStore<OrganizationDetails>({
    defaultValues: {
      slug: organization.slug,
      primaryColor: organization.primaryColor || "",
      secondaryColor: organization.secondaryColor || "",
      registrationNumber: organization.registrationNumber || "",
      taxNumber: organization.taxNumber || "",
      heroSectionImageSrc: heroSectionEn.image?.src || "",
      heroSectionImageAltEn: heroSectionEn.image?.alt || "",
      heroSectionTitleEn: heroSectionEn.title,
      heroSectionTextEn: heroSectionEn.text,
      heroSectionImageAltDe: heroSectionDe.image?.alt || "",
      heroSectionTitleDe: heroSectionDe.title,
      heroSectionTextDe: heroSectionDe.text,
      aboutSectionTitleEn: aboutSectionEn.title || "",
      aboutSectionTextEn: aboutSectionEn.text || "",
      aboutSectionTitleDe: aboutSectionDe.title || "",
      aboutSectionTextDe: aboutSectionEn.text || "",
      coachSectionImageSrc: coachSectionEn.image?.src || "",
      coachSectionImageAltEn: coachSectionEn.image?.alt || "",
      coachSectionTitleEn: coachSectionEn.title || "",
      coachSectionTextEn: coachSectionEn.text || "",
      coachSectionImageAltDe: coachSectionDe.image?.alt || "",
      coachSectionTitleDe: coachSectionDe.title || "",
      coachSectionTextDe: coachSectionDe.text || "",
    },
  });

  const $ = store.names;

  return (
    <Container element="section">
      <Form store={store} onSubmit={onSubmit}>
        <HiddenInput name={`${$.slug}`} />
        <Stack>
          <Text size="xl">Marketing</Text>
          <Stack direction="horizontal">
            <FormField name={$.primaryColor} label="Primary color" grow>
              <FormInput name={$.primaryColor} />
            </FormField>
            <FormField name={$.secondaryColor} label="Secondary color" grow>
              <FormInput name={$.secondaryColor} />
            </FormField>
          </Stack>
          <Stack>
            <Box paddingX="none" paddingY="none">
              <Text size="l">Hero Section</Text>
              <img src={store.getValue($.heroSectionImageSrc)} />
              <Upload
                onUploaded={(url) => store.setValue($.heroSectionImageSrc, url)}
              />
              <Stack direction="horizontal">
                <EditSection
                  locale="en"
                  altText={$.heroSectionImageAltEn}
                  text={$.heroSectionTextEn}
                  title={$.heroSectionTitleEn}
                />
                <EditSection
                  locale="de"
                  altText={$.heroSectionImageAltDe}
                  text={$.heroSectionTextDe}
                  title={$.heroSectionTitleDe}
                />
              </Stack>
            </Box>
            <Box paddingX="none" paddingY="none">
              <Text size="l">About Section</Text>
              <Stack direction="horizontal">
                <EditSection
                  locale="en"
                  text={$.aboutSectionTextEn}
                  title={$.aboutSectionTitleEn}
                />
                <EditSection
                  locale="de"
                  text={$.aboutSectionTextDe}
                  title={$.aboutSectionTitleDe}
                />
              </Stack>
            </Box>
            <Box paddingX="none" paddingY="none">
              <Text size="l">Coach Section</Text>
              <img src={store.getValue($.coachSectionImageSrc)} />
              <Upload
                onUploaded={(url) =>
                  store.setValue($.coachSectionImageSrc, url)
                }
              />
              <Stack direction="horizontal">
                <EditSection
                  locale="en"
                  altText={$.coachSectionImageAltEn}
                  title={$.coachSectionTitleEn}
                  text={$.coachSectionTextEn}
                />
                <EditSection
                  locale="de"
                  altText={$.coachSectionImageAltDe}
                  title={$.coachSectionTitleDe}
                  text={$.coachSectionTextDe}
                />
              </Stack>
            </Box>
          </Stack>
          <Text size="xl">Business Information</Text>
          <Stack direction="horizontal">
            <FormField
              name={$.registrationNumber}
              label="Business Registration Number"
              grow
            >
              <FormInput name={$.registrationNumber} />
            </FormField>
            <FormField name={$.taxNumber} label="VAT Number">
              <FormInput name={$.taxNumber} />
            </FormField>
          </Stack>
          <Button type="submit">Save</Button>
        </Stack>
      </Form>
    </Container>
  );
};
