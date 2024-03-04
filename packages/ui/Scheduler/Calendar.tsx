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

export const Calendar = ({
  year,
  month,
  selectedDate,
  setSelectedDate,
}: {
  year: number;
  month: number;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
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
      <WeekdaysHeading />
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
  );
};
