import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WeekdaysHeading } from "./Weekdays";
import { Button } from "../Button/Button";
import {
  eachDayOfInterval,
  endOfDay,
  format,
  isPast,
  isSameDay,
  isWeekend,
  lastDayOfMonth,
} from "date-fns";
import { calendarContainer } from "./calendar.css";
import { Locales } from "@octocoach/i18n/src/i18n-types";

export const Calendar = ({
  year,
  month,
  selectedDate,
  setSelectedDate,
  locale,
}: {
  year: number;
  month: number;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  locale: Locales;
}) => {
  const [paddingArray, setPaddingArray] = useState<string[]>([]);
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
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

  return (
    <div className={calendarContainer}>
      <WeekdaysHeading locale={locale} />
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
          disabled={isPast(endOfDay(day))}
          glow={isSameDay(day, selectedDate)}
        >
          {format(day, "d")}
        </Button>
      ))}
    </div>
  );
};
