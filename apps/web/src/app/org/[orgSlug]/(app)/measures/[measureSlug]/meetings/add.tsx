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
  minutesToSeconds,
  roundToNearestMinutes,
} from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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

  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      const startTime = new Date(store.getState().values.startTime);
      const endTime = addMinutes(startTime, 45);

      createMeeting({
        measure: measureInfo.id,
        type: "consultation",
        startTime,
        endTime,
      }).then(() => {
        router.refresh();
      });
    });
  };

  return (
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
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
