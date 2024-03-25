"use client";

import {
  Button,
  Checkbox,
  Form,
  FormCheckboxGroup,
  Stack,
  useFormStore,
} from "@octocoach/ui";
import { availability } from "@octocoach/ui/Scheduler/constants";
import { useEffect, useState, useTransition } from "react";
import {
  GoogleCalendar,
  SaveCoachPreferencesValues,
  getFreeBusy,
  getGoogleCalendars,
  saveCoachPreferences,
} from "./actions";

export const GetEvents = ({
  orgSlug,
  userId,
  userEmail,
}: {
  orgSlug: string;
  userId: string;
  userEmail: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const [calendars, setCalendars] = useState({
    google: { [userEmail]: [] as GoogleCalendar[] },
  });

  const store = useFormStore<SaveCoachPreferencesValues>({
    defaultValues: {
      hoursBuffer: 12,
      availability,
      externalCalendars: {
        google: {
          [userEmail]: [],
        },
      },
    },
  });

  const $ = store.names;

  useEffect(() => {
    getGoogleCalendars({ userId, orgSlug }).then((calendars) => {
      setCalendars({ google: { [userEmail]: calendars } });
    });
  }, [orgSlug, userId]);

  const onGetEvents = () => {
    startTransition(() => {
      getFreeBusy({ userId, orgSlug }).then(() => console.log("ok"));
    });
  };

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
        <FormCheckboxGroup
          setValue={(value) =>
            store.setValue($.externalCalendars, {
              google: { [userEmail]: value },
            })
          }
          getValue={() => store.getValue($.externalCalendars).google[userEmail]}
        >
          {calendars.google[userEmail].map((calendar) => (
            <Checkbox
              label={calendar.summary}
              value={calendar.id}
              key={calendar.id}
            />
          ))}
        </FormCheckboxGroup>

        <Button onClick={onSaveCoachPreferences} disabled={isPending}>
          Save
        </Button>

        <Button onClick={onGetEvents} disabled={isPending}>
          Get Events
        </Button>
      </Stack>
    </Form>
  );
};
