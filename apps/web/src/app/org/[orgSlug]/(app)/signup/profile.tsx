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

  const signUpDisbled = () => {
    const { values } = store.useState();

    const firstName = values.firstName && values.firstName.trim().length > 0;
    const lastName = values.lastName && values.lastName.trim().length > 0;

    return !firstName || !lastName || !values.termsAccepted;
  };

  return (
    <Card>
      <Form store={store} onSubmit={onSubmit}>
        <Stack spacing="loose">
          <Text variation="casual" weight="light">
            We need some information to get your account set up...
          </Text>
          <Stack spacing="tight">
            <FormField name={$.firstName} label="First name" grow>
              <FormInput name={$.firstName} />
            </FormField>
            <FormField name={$.lastName} label="Last name" grow>
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
          <Stack direction="horizontal" justify="right">
            <Button type="submit" disabled={signUpDisbled()}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
};
