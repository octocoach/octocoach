"use client";

import { useBasePath } from "@hooks/base-path";
import { useSession } from "@octocoach/auth/react";
import { UserProfile } from "@octocoach/db/schemas/types";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import {
  Button,
  Card,
  City,
  Form,
  FormCheckbox,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { ProfileForm, saveProfile } from "./actions";

export const Profile = ({
  orgSlug,
  profile,
}: {
  orgSlug: string;
  profile?: UserProfile;
}) => {
  const { LL } = useI18nContext();
  const { data: session } = useSession();

  const search = useSearchParams();
  const origin = search.get("origin") ?? undefined;

  const store = useFormStore<ProfileForm>({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      city: profile?.city || "",
      termsAccepted: profile?.termsAccepted || false,
      emailCommunicationAccepted: profile?.emailCommunicationAccepted || false,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    startTransition(() => {
      const { values } = store.getState();
      setSubmitting(true);
      saveProfile(
        {
          orgSlug,
          userId: session!.user.id,
          origin,
        },
        values
      ).then(() => setSubmitting(false));
    });
  };

  const $ = store.names;

  const signUpDisbled = () => {
    const { values } = store.useState();

    const firstName = values.firstName && values.firstName.trim().length > 0;
    const lastName = values.lastName && values.lastName.trim().length > 0;

    return (
      !firstName ||
      !lastName ||
      !values.city ||
      !values.termsAccepted ||
      store.getState().submitting ||
      submitting ||
      isPending
    );
  };

  const basePath = useBasePath();

  return (
    <Card>
      <Form store={store} onSubmit={onSubmit}>
        <Stack spacing="loose">
          <Text variation="casual" weight="light">
            {LL.signup.profile.subTitle()}
          </Text>
          <Stack spacing="tight">
            <FormField
              name={$.firstName}
              label={LL.signup.profile.firstName()}
              grow
            >
              <FormInput name={$.firstName} />
            </FormField>
            <FormField
              name={$.lastName}
              label={LL.signup.profile.lastName()}
              grow
            >
              <FormInput name={$.lastName} />
            </FormField>
          </Stack>
          <FormField label={LL.signup.profile.city()} name={$.city}>
            <City
              setValue={(city) => store.setValue($.city, city)}
              value={profile?.city || ""}
              emptySuggestionsText={LL.signup.profile.emptySuggestionsText()}
            />
          </FormField>
          <Stack spacing="tight">
            <FormCheckbox
              name={$.termsAccepted}
              label={LL.signup.profile.termsAccepted()}
            />
            <FormCheckbox
              name={$.emailCommunicationAccepted}
              label={LL.signup.profile.emailCommunicationAccepted()}
            />
          </Stack>
          <Stack direction="horizontal" justify="right">
            <Button type="submit" disabled={signUpDisbled()}>
              {LL.signup.profile.signUp()}
            </Button>
          </Stack>
          <Stack direction="horizontal" justify="center">
            <Link href={`${basePath}/privacy`} target="_blank">
              <Text size="s">{LL.privacyPolicy()}</Text>
            </Link>
            <Link href={`${basePath}/terms`} target="_blank">
              <Text size="s">{LL.termsOfUse()}</Text>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
};
