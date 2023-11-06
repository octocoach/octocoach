"use client";

import Upload from "@components/Upload";
import { Organization } from "@octocoach/db/schemas/common/organization";
import {
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

export const Edit = ({ organization }: { organization: Organization }) => {
  const store = useFormStore<OrganizationDetails>({
    defaultValues: {
      slug: organization.slug,
      primaryColor: organization.primaryColor || "",
      secondaryColor: organization.secondaryColor || "",
      registrationNumber: organization.registrationNumber || "",
      taxNumber: organization.taxNumber || "",
      tagLine: organization.tagLine || "",
    },
  });

  const $ = store.names;

  return (
    <Container element="section">
      <Form store={store} onSubmit={onSubmit}>
        <HiddenInput name={`${$.slug}`} />
        <Stack>
          <Text size="l">Marketing</Text>
          <FormField name={$.tagLine} label="Tagline">
            <FormInput name={$.tagLine} />
          </FormField>
          <Stack direction="horizontal">
            <FormField name={$.primaryColor} label="Primary color" grow>
              <FormInput name={$.primaryColor} />
            </FormField>
            <FormField name={$.secondaryColor} label="Secondary color" grow>
              <FormInput name={$.secondaryColor} />
            </FormField>
          </Stack>
          <Text size="l">Business Information</Text>
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
      <Upload />
    </Container>
  );
};
