"use client";

import { getLocalTimezone } from "@helpers/client/locale";
import { MeasureInfo } from "@octocoach/db/schemas/org/measure";
import {
  Button,
  Form,
  FormField,
  Stack,
  Text,
  useFormStore,
} from "@octocoach/ui";
import { FormDateTimeInput } from "@octocoach/ui/Form/FormDateTimeInput";
import {
  addHours,
  addMinutes,
  addWeeks,
  format,
  formatISO,
  minutesToSeconds,
  roundToNearestMinutes,
} from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateMeetingParams } from "./actions";

export const AddMeeting = ({
  measureInfo,
  createMeeting,
}: {
  measureInfo: MeasureInfo;
  createMeeting: (params: CreateMeetingParams) => Promise<void>;
}) => {
  const store = useFormStore({
    defaultValues: {
      startTime: "",
    },
  });

  const $ = store.names;

  const router = useRouter();

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [timezone, setTimezone] = useState("");
  const limitFormat = "yyyy-MM-dd'T'HH:mm";

  useEffect(() => {
    const now = new Date();
    const newMin = roundToNearestMinutes(addHours(now, 3), {
      nearestTo: 15,
      roundingMethod: "ceil",
    });
    setMin(format(newMin, limitFormat));
    setMax(format(addWeeks(newMin, 12), limitFormat));
    setTimezone(getLocalTimezone());
  }, []);

  const onSubmit = async () => {
    const { startTime } = store.getState().values;
    const endTime = format(addMinutes(startTime, 45), limitFormat);

    createMeeting({
      measure: measureInfo.id,
      type: "consultation",
      startTime,
      endTime,
    }).then(() => {
      router.refresh();
    });
  };

  const { startTime } = store.useState().values;

  return (
    <>
      <pre></pre>
      <Form store={store} onSubmit={onSubmit}>
        <Stack>
          <Text>Timezone: {timezone}</Text>
          <FormField name={$.startTime} label="Start">
            <FormDateTimeInput
              name={$.startTime}
              min={min}
              max={max}
              step={minutesToSeconds(15)}
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
      <pre>
        {startTime &&
          Intl.DateTimeFormat("de-DE", {
            timeZone: "UTC",
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(startTime))}
      </pre>
    </>
  );
};
