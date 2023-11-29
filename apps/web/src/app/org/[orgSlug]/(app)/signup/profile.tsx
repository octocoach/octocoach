"use client";

import { useBasePath } from "@hooks/base-path";
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
import Link from "next/link";
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

    return (
      !firstName ||
      !lastName ||
      !values.termsAccepted ||
      store.getState().submitting
    );
  };

  const buttonText = store.getState().submitting ? "Signing Up" : "Sign Up";

  const basePath = useBasePath();

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
              label="I accept the privacy policy and terms of use"
            />
            <FormCheckbox
              name={$.emailCommunicationAccepted}
              label="You may send me marketing related emails"
            />
          </Stack>
          <Stack direction="horizontal" justify="right">
            <Button type="submit" disabled={signUpDisbled()}>
              {buttonText}
            </Button>
          </Stack>
          <Stack direction="horizontal" justify="center">
            <Link href={`${basePath}/privacy`} target="_blank">
              <Text size="s">Privacy Policy</Text>
            </Link>
            <Link href={`${basePath}/terms`} target="_blank">
              <Text size="s">Terms of Use</Text>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
};
