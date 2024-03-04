"use client";

import type { Measure } from "@octocoach/db/schemas/org/measure";
import type { Meeting } from "@octocoach/db/schemas/org/meeting";
import { Interval, addMinutes } from "date-fns";
import { useState, useTransition } from "react";
import { Stack } from "../Stack/Stack";
import { Calendar } from "./Calendar";
import { CalendarNavigation } from "./CalendarNavigation";
import { Timeslots } from "./Timeslots";
import { CreateMeetingParams } from "./types";

export default function Scheduler({
  createMeeting,
  measureId,
  coachId,
  coachName,
  coachImage,
  coachMeetings,
  meetingType,
}: {
  createMeeting: (params: CreateMeetingParams) => Promise<void>;
  measureId: Measure["id"];
  coachId: string;
  coachName?: string | null;
  coachImage?: string | null;
  coachMeetings: Interval[];
  meetingType: Meeting["type"];
}) {
  const now = new Date();

  const [selectedDate, setSelectedDate] = useState(now);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [isPending, startTransition] = useTransition();

  const onCreateMeeting = (startTime: Date) => {
    const endTime = addMinutes(startTime, 45);

    startTransition(() => {
      createMeeting({
        meeting: {
          measure: measureId,
          type: meetingType,
          startTime,
          endTime,
        },
        coachId,
      });
    });
  };

  return (
    <Stack direction="horizontal">
      <Stack>
        <CalendarNavigation
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          year={year}
          month={month}
        />
      </Stack>
      <Timeslots
        selectedDate={selectedDate}
        onCreateMeeting={onCreateMeeting}
        busyIntervals={coachMeetings}
        creatingMeeting={isPending}
      />
    </Stack>
  );
}
