"use client";

import type { Measure } from "@octocoach/db/schemas/org/measure";
import type { Meeting } from "@octocoach/db/schemas/org/meeting";
import { Interval, addMinutes } from "date-fns";
import { useState, useTransition } from "react";
import { Stack } from "../Stack/Stack";
import { Calendar } from "./Calendar";
import { CalendarNavigation } from "./CalendarNavigation";
import { Person } from "./Person";
import { Timeslots } from "./Timeslots";
import { schedulerContainer, schedulerContent } from "./scheduler.css";
import { CreateMeetingParams } from "./types";

export const Scheduler = ({
  createMeeting,
  measureId,
  coach,
  coachMeetings,
  meetingType,
}: {
  createMeeting: (params: CreateMeetingParams) => Promise<void>;
  measureId: Measure["id"];
  coach: { id: string; name: string; image: string };
  coachMeetings: Interval[];
  meetingType: Meeting["type"];
}) => {
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
        coachId: coach.id,
      });
    });
  };

  return (
    <div className={schedulerContainer}>
      <Person name={coach.name} image={coach.image} meetingType={meetingType} />
      <div className={schedulerContent}>
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
      </div>
    </div>
  );
};
