"use client";

import type { Measure } from "@octocoach/db/schemas/org/measure";
import type { Meeting } from "@octocoach/db/schemas/org/meeting";
import { Interval, addMinutes, format } from "date-fns";
import { useState, useTransition } from "react";
import { Stack } from "../Stack/Stack";
import { Calendar } from "./Calendar";
import { CalendarNavigation } from "./CalendarNavigation";
import { Person } from "./Person";
import { Timeslots } from "./Timeslots";
import { schedulerContainer, schedulerContent } from "./scheduler.css";
import { CreateMeetingParams } from "./types";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Text } from "../Text/Text";
import { getLocale } from "./helpers";
import { Button } from "../Button/Button";
import Message from "@octocoach/i18n/src/react-message";
import { Card } from "../Card/Card";

export const Scheduler = ({
  createMeeting,
  measureId,
  coach,
  meetingType,
  locale,
  getBusyIntervals,
}: {
  createMeeting: (params: CreateMeetingParams) => Promise<void>;
  measureId: Measure["id"];
  coach: {
    id: string;
    name?: string | null;
    image?: string | null;
    hoursBuffer: number;
  };
  meetingType: Meeting["type"];
  locale: Locales;
  getBusyIntervals: (date: Date) => Promise<Interval[]>;
}) => {
  const now = new Date();

  const [selectedDate, setSelectedDate] = useState(now);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedTimeslot, setSelectedTimeslot] = useState<Date>();
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
      }).then(() => setSelectedTimeslot(undefined));
    });
  };

  return (
    <div className={schedulerContainer}>
      <Person name={coach.name} image={coach.image} meetingType={meetingType} />
      {!selectedTimeslot ? (
        <div className={schedulerContent}>
          <Stack>
            <CalendarNavigation
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
              locale={locale}
            />
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              year={year}
              month={month}
              locale={locale}
            />
          </Stack>
          <Timeslots
            selectedDate={selectedDate}
            setSelectedTimeslot={setSelectedTimeslot}
            creatingMeeting={isPending}
            locale={locale}
            hoursBuffer={coach.hoursBuffer}
            getBusyIntervals={getBusyIntervals}
          />
        </div>
      ) : (
        <Card>
          <Stack spacing="loose">
            <Text size="l" weight="bold" textAlign="center">
              {format(selectedTimeslot, "PPPPpppp", {
                locale: getLocale(locale),
              })}
            </Text>
            <Stack direction="horizontal" justify="center">
              <Button
                color="subtle"
                onClick={() => setSelectedTimeslot(undefined)}
                disabled={isPending}
              >
                <Message id="back" />
              </Button>
              <Button
                onClick={() => onCreateMeeting(selectedTimeslot)}
                disabled={isPending}
              >
                <Message id="confirm" />
              </Button>
            </Stack>
          </Stack>
        </Card>
      )}
    </div>
  );
};
