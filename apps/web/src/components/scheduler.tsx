"use client";

import { CreateMeetingParams } from "@app/org/[orgSlug]/(app)/measures/[measureSlug]/meetings/actions";
import { MeasureInfo } from "@octocoach/db/schemas/org/measure";
import { Box, Button, Stack, Text, vars } from "@octocoach/ui";
import { NextFilled, PreviousFilled } from "@octocoach/ui/icons";
import {
  addHours,
  addMinutes,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isWeekend,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

function getWeekDays(date = new Date()) {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end }).map((day) =>
    format(day, "EEE")
  );

  return days;
}

const weekdays = getWeekDays();

export default function Scheduler({
  createMeeting,
  measureInfo,
}: {
  createMeeting: (params: CreateMeetingParams) => Promise<void>;
  measureInfo: MeasureInfo;
}) {
  const now = new Date();

  const [selectedDate, setSelectedDate] = useState(now);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [days, setDays] = useState<Date[]>([]);
  const [timeslots, setTimeslots] = useState<Date[]>([]);
  const [paddingArray, setPaddingArray] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function getMonthName(monthIndex: number) {
    const date = new Date();
    date.setMonth(monthIndex);
    return format(date, "MMMM");
  }

  useEffect(() => {
    if (typeof year === "undefined" || typeof month === undefined) return;

    const start = new Date(year, month, 1);
    setDays(
      eachDayOfInterval({
        start: start,
        end: lastDayOfMonth(start),
      })
    );
    const p = start.getDay() === 0 ? 6 : start.getDay() - 1;

    const d = Array.from(Array(p).keys()).map((key) => `p-${key}`);
    setPaddingArray(d);
  }, [year, month]);

  useEffect(() => {
    let date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      9,
      0
    );

    const end = addHours(date, 8);

    const slots: Date[] = [];

    while (date < end) {
      slots.push(date);
      date = addMinutes(date, 30);
    }
    setTimeslots(slots);
  }, [selectedDate]);

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  };

  const onCreateMeeting = (startTime: Date) => {
    const endTime = addMinutes(startTime, 45);

    startTransition(() => {
      createMeeting({
        measure: measureInfo.id,
        type: "consultation",
        startTime,
        endTime,
      }).then(() => router.refresh());
    });
  };

  return (
    <Stack direction="horizontal" fullWidth>
      <Stack fullWidth>
        <Stack
          direction="horizontal"
          align="center"
          justify="between"
          fullWidth
        >
          <Stack direction="horizontal" fullWidth>
            <Text size="l" weight="heavy" variation="casual">
              {getMonthName(month)}
            </Text>
            <Text size="l" weight="light">
              {year}
            </Text>
          </Stack>
          <Stack spacing="tight" direction="horizontal">
            <Button size="small" onClick={prevMonth} color="subtle">
              <PreviousFilled />
            </Button>
            <Button size="small" onClick={nextMonth} color="subtle">
              <NextFilled />
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 6,
            }}
          >
            {weekdays.map((weekday) => (
              <Text key={weekday} textAlign="center" weight="light">
                {weekday.toUpperCase()}
              </Text>
            ))}
            {paddingArray.map((key) => (
              <div key={key} />
            ))}
            {days.map((day) => (
              <Button
                key={day.getDate()}
                size="small"
                onClick={() => {
                  setSelectedDate(day);
                }}
                disabled={isPast(endOfDay(day)) || isWeekend(day)}
                glow={isSameDay(day, selectedDate)}
              >
                {format(day, "d")}
              </Button>
            ))}
          </div>
        </Stack>
      </Stack>
      <Stack>
        <Text size="l" weight="light" variation="casual">
          {format(selectedDate, "EEE d")}
        </Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 240,
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: `${vars.color.surface[2]} ${vars.color.surface[0]}`,
            gap: 2,
            padding: 2,
          }}
        >
          {timeslots.map((timeslot) => (
            <Button
              key={format(timeslot, "HH:mm")}
              color="accent"
              size="small"
              disabled={isPending || isPast(timeslot)}
              onClick={() => onCreateMeeting(timeslot)}
            >
              {format(timeslot, "HH:mm")}
            </Button>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}
