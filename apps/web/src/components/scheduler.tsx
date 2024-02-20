"use client";

import { Box, Button, Stack, Text } from "@octocoach/ui";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfWeek,
  format,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";

function getWeekDays(date = new Date()) {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end }).map((day) =>
    format(day, "EEE")
  );

  return days;
}

const weekdays = getWeekDays();

export default function Scheduler({}: {}) {
  const now = new Date();

  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth());

  const [days, setDays] = useState<Date[]>();
  const [months, setMonths] = useState<Date[]>();
  const [paddingDays, setPaddingDays] = useState(0);
  const [paddingArray, setPaddingArray] = useState<string[]>([]);

  function getMonthName(monthIndex: number) {
    const date = new Date();
    date.setMonth(monthIndex);
    return format(date, "MMM");
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
    setPaddingDays(p);

    const d = Array.from(Array(p).keys()).map((key) => `p-${key}`);
    setPaddingArray(d);
  }, [year, month]);

  useEffect(() => {
    if (!year) return;
    setMonths(
      eachMonthOfInterval({
        start: new Date(year, 0, 1),
        end: new Date(year, 11, 31),
      })
    );
  }, [year]);

  return (
    <Box>
      <Text>PaddingDays: {paddingDays}</Text>
      <Text>
        {year} - {getMonthName(month)}
      </Text>
      <Stack fullWidth direction="horizontal">
        <Stack>
          {months?.map((month) => (
            <Button
              key={month.getMonth()}
              onClick={() => setMonth(month.getMonth())}
            >
              {format(month, "MMM")}
            </Button>
          ))}
        </Stack>
        <Stack>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
          >
            {weekdays.map((weekday) => (
              <Text>{weekday}</Text>
            ))}
            {paddingArray.map((key) => (
              <div key={key} />
            ))}
            {days?.map((day) => (
              <Box key={day.getDate()} paddingX="small" paddingY="small">
                <Text>{format(day, "d")}</Text>
              </Box>
            ))}
          </div>
        </Stack>
      </Stack>
    </Box>
  );
}
