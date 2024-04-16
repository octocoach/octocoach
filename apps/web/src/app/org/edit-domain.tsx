import { Organization } from "@octocoach/db/schemas/common/organization";
import {
  Button,
  Form,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";

import { DomainDetails, saveDomain } from "./actions";

export const EditDomain = ({
  organization,
}: {
  organization: Organization;
}) => {
  const store = useFormStore<DomainDetails>({
    defaultValues: {
      domain: organization.domain || "",
      githubId: organization.githubId || "",
      githubSecret: "",
    },
  });

  const onSubmit = saveDomain.bind("slug", organization.slug);

  const $ = store.names;

  return (
    <Form store={store} onSubmit={onSubmit}>
      <Text size="xl">Add a custom domain</Text>
      <Stack>
        <FormField name={$.domain} label="Domain">
          <FormInput name={$.domain} />
        </FormField>
        <FormField name={$.githubId} label="Github ID">
          <FormInput name={$.githubId} />
        </FormField>
        <FormField name={$.githubSecret} label="Github Secret">
          <FormInput name={$.githubSecret} />
        </FormField>
        <Button type="submit">Save Domain</Button>
      </Stack>
    </Form>
  );
};
