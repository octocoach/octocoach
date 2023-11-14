"use client";

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
      email: organization.email || "",
      phone: organization.phone || "",
      primaryColor: organization.primaryColor || "",
      secondaryColor: organization.secondaryColor || "",
      registrationNumber: organization.registrationNumber || "",
      taxNumber: organization.taxNumber || "",
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
          <Stack></Stack>
          <Text size="xl">Business Information</Text>
          <Stack direction="horizontal">
            <FormField name={$.email} label="Email" grow>
              <FormInput name={$.email} />
            </FormField>
            <FormField name={$.phone} label="Phone" grow>
              <FormInput name={$.phone} />
            </FormField>
          </Stack>
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
