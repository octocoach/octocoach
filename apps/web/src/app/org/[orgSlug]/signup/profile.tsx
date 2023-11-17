"use client";

import {
  Button,
  Form,
  FormField,
  FormInput,
  Stack,
  useFormStore,
} from "@octocoach/ui";
import { ProfileForm, saveProfile } from "./actions";
import { useSession } from "@octocoach/auth/react";

export const Profile = ({ orgSlug }: { orgSlug: string }) => {
  const { data: session } = useSession();

  const store = useFormStore<ProfileForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
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
    <Form store={store} onSubmit={onSubmit}>
      <Stack>
        <Stack direction="horizontal">
          <FormField name={$.firstName} label="Given name" grow>
            <FormInput name={$.firstName} />
          </FormField>
          <FormField name={$.lastName} label="Surname" grow>
            <FormInput name={$.lastName} />
          </FormField>
        </Stack>
        <Button type="submit">Save</Button>
      </Stack>
    </Form>
  );
};
