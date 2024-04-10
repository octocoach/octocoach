"use client";

import {
  Availability,
  ExternalCalendars,
} from "@octocoach/db/schemas/org/coach";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Button,
  Checkbox,
  Form,
  FormCheckboxGroup,
  FormField,
  FormInput,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { Save } from "@octocoach/ui/icons";
import { useEffect, useState, useTransition } from "react";
import {
  GoogleCalendar,
  SaveCoachPreferencesValues,
  getGoogleCalendars,
  saveCoachPreferences,
} from "./actions";
import { EditAvailability } from "./availability";

export const CoachPreferences = ({
  orgSlug,
  userId,
  userEmail,
  availability,
  externalCalendars,
  hoursBuffer,
  locale,
}: {
  orgSlug: string;
  userId: string;
  userEmail: string;
  availability: Availability;
  externalCalendars: ExternalCalendars;
  hoursBuffer: number;
  locale: Locales;
}) => {
  const [isPending, startTransition] = useTransition();

  const [calendars, setCalendars] = useState({
    google: { [userEmail]: [] as GoogleCalendar[] },
  });

  const store = useFormStore<SaveCoachPreferencesValues>({
    defaultValues: {
      hoursBuffer,
      availability,
      externalCalendars,
    },
  });

  const $ = store.names;

  useEffect(() => {
    getGoogleCalendars({ userId, orgSlug }).then((calendars) => {
      setCalendars({ google: { [userEmail]: calendars } });
    });
  }, [orgSlug, userId, userEmail]);

  const onSaveCoachPreferences = () => {
    startTransition(() => {
      const { values } = store.getState();
      saveCoachPreferences(orgSlug, values).then(() => {
        console.log("Done");
      });
    });
  };

  return (
    <Form store={store}>
      <Stack>
        <FormField name={$.hoursBuffer} label="Hours Buffer">
          <FormInput
            name={$.hoursBuffer}
            type="number"
            min={0}
            max={24}
            step={1}
          />
        </FormField>
        <EditAvailability
          availability={store.useState().values.availability}
          setAvailability={(availability) =>
            store.setValue($.availability, availability)
          }
          locale={locale}
        />
        <div>
          <Text size="xl">
            Select which calendars to check for existing events
          </Text>
          <FormCheckboxGroup
            setValue={(value) =>
              store.setValue($.externalCalendars, {
                google: { [userEmail]: value },
              })
            }
            getValue={() =>
              store.getValue($.externalCalendars).google[userEmail]
            }
          >
            {calendars.google[userEmail]?.map((calendar) => (
              <Checkbox
                label={calendar.summary}
                value={calendar.id}
                key={calendar.id}
              />
            ))}
          </FormCheckboxGroup>
        </div>

        <Button onClick={onSaveCoachPreferences} disabled={isPending}>
          <Save size="20" />
          <Text>Save</Text>
        </Button>
      </Stack>
    </Form>
  );
};
