"use client";

import Upload from "@components/Upload";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  Box,
  Button,
  Container,
  Form,
  FormField,
  FormInput,
  HiddenInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { onSubmit, type OrganizationDetails } from "./actions";
import { SectionContent } from "./admin";

export const Edit = ({
  organization,
  content,
}: {
  organization: Organization;
  content: SectionContent[];
}) => {
  const heroSections = content.filter(({ id }) => id === "hero");

  const heroSectionImage = heroSections.length
    ? heroSections[0].image
    : { src: "", alt: "" };

  const heroSectionEn = heroSections.find(({ locale }) => locale === "en");
  const heroSectionDe = heroSections.find(({ locale }) => locale === "de");

  interface HeroSectionValue {
    title: string;
    text: string;
  }

  const heroSectionValueEn = (heroSectionEn?.value as HeroSectionValue) || {
    title: "",
    text: "",
  };
  const heroSectionValueDe = (heroSectionDe?.value as HeroSectionValue) || {
    title: "",
    text: "",
  };

  const store = useFormStore<OrganizationDetails>({
    defaultValues: {
      slug: organization.slug,
      primaryColor: organization.primaryColor || "",
      secondaryColor: organization.secondaryColor || "",
      registrationNumber: organization.registrationNumber || "",
      taxNumber: organization.taxNumber || "",
      heroSectionImageSrc: heroSectionImage.src,
      heroSectionImageAlt: heroSectionImage.alt,
      heroSectionTitleEn: heroSectionValueEn.title,
      heroSectionTextEn: heroSectionValueEn.text,
      heroSectionTitleDe: heroSectionValueDe.title,
      heroSectionTextDe: heroSectionValueDe.text,
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
              <img
                src={store.getValue($.heroSectionImageSrc)}
                alt={store.getValue($.heroSectionImageAlt)}
              />
              <Upload
                onUploaded={(url) => store.setValue($.heroSectionImageSrc, url)}
              />
              <FormField name={$.heroSectionImageAlt} label="Alt Text">
                <FormInput name={$.heroSectionImageAlt} />
              </FormField>
              <Stack direction="horizontal">
                <Box paddingX="none" grow>
                  <Text size="l">English</Text>
                  <FormField name={$.heroSectionTitleEn} label="Title">
                    <FormInput name={$.heroSectionTitleEn} />
                  </FormField>
                  <FormField name={$.heroSectionTextEn} label="Text">
                    <FormInput
                      name={$.heroSectionTextEn}
                      render={<textarea style={{ height: "10rem" }} />}
                    />
                  </FormField>
                </Box>
                <Box paddingX="none" grow>
                  <Text size="l">German</Text>
                  <FormField name={$.heroSectionTitleDe} label="Title">
                    <FormInput name={$.heroSectionTitleDe} />
                  </FormField>
                  <FormField name={$.heroSectionTextDe} label="Text">
                    <FormInput
                      name={$.heroSectionTextDe}
                      render={<textarea style={{ height: "10rem" }} />}
                    />
                  </FormField>
                </Box>
              </Stack>
            </Box>
            <Box paddingX="none" paddingY="none">
              <Text size="l">About Section</Text>
            </Box>
            <Box paddingX="none" paddingY="none">
              <Text size="l">Coach Section</Text>
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
