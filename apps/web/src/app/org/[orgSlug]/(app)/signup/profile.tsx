"use client";

import { useSession } from "@octocoach/auth/react";
import { UserProfile } from "@octocoach/db/schemas/types";
import {
  Button,
  Card,
  Form,
  FormCheckbox,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { ProfileForm, saveProfile } from "./actions";

export const Profile = ({
  orgSlug,
  profile,
}: {
  orgSlug: string;
  profile: UserProfile;
}) => {
  const { data: session } = useSession();

  const store = useFormStore<ProfileForm>({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      termsAccepted: profile?.termsAccepted || false,
      emailCommunicationAccepted: profile?.emailCommunicationAccepted || false,
    },
  });

  const saveProfileWithUserId = saveProfile.bind("boundValues", {
    orgSlug,
    userId: session.user.id,
  });

  const onSubmit = async () => {
    saveProfileWithUserId(store.getState().values);
  };

  const $ = store.names;

  return (
    <Card>
      <Form store={store} onSubmit={onSubmit}>
        <Text size="l" variation="casual">
          User Profile
        </Text>
        <Stack spacing="loose">
          <Stack direction="horizontal">
            <FormField name={$.firstName} label="Given name" grow>
              <FormInput name={$.firstName} />
            </FormField>
            <FormField name={$.lastName} label="Surname" grow>
              <FormInput name={$.lastName} />
            </FormField>
          </Stack>
          <Stack spacing="tight">
            <FormCheckbox
              name={$.termsAccepted}
              label="I accept the terms of use"
            />
            <FormCheckbox
              name={$.emailCommunicationAccepted}
              label="You may send me marketing related emails"
            />
          </Stack>
          <Button type="submit">Save</Button>
        </Stack>
      </Form>
    </Card>
  );
};
