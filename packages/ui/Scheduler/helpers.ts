import { Availability, DayIndex } from "@octocoach/db/schemas/org/coach";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  addDays,
  addHours,
  addMinutes,
  areIntervalsOverlapping,
  format,
  Interval,
  isAfter,
  isSameDay,
} from "date-fns";
import { de, enUS } from "date-fns/locale";
import { convertToLocalTime, convertToTimeZone } from "date-fns-timezone";

export const isAvailable = (
  date: Date,
  duration: number,
  busy: Interval[]
): boolean => {
  const hasMeeting = busy.some((coachMeeting) =>
    areIntervalsOverlapping(coachMeeting, {
      start: date,
      end: addMinutes(date, duration),
    })
  );

  return !hasMeeting;
};

export const getMonthName = (monthIndex: number, locale: Locales) => {
  const date = new Date();
  date.setMonth(monthIndex);
  return format(date, "MMMM", { locale: getLocale(locale) });
};

export const getLocale = (locale: Locales) => {
  switch (locale) {
    case "de":
      return de;
    default:
      return enUS;
  }
};

export const getSlots = ({
  availability,
  coachTimezone,
  date,
  duration,
  hoursBuffer,
}: {
  availability: Availability;
  coachTimezone: string;
  date: Date;
  duration: number;
  hoursBuffer: number;
}): Date[] => {
  const coachDate = convertToTimeZone(date, { timeZone: coachTimezone });

  const today = coachDate;
  const tomorrow = addDays(coachDate, 1);
  const now = new Date();

  const todaySlots = availability[today.getDay() as DayIndex].map(
    ({ startTime, endTime }) => ({
      start: convertToLocalTime(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          startTime.hh,
          startTime.mm
        ),
        { timeZone: coachTimezone }
      ),
      end: convertToLocalTime(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          endTime.hh,
          endTime.mm
        ),
        { timeZone: coachTimezone }
      ),
    })
  );

  const tomorrowSlots = availability[tomorrow.getDay() as DayIndex].map(
    ({ startTime, endTime }) => ({
      start: convertToLocalTime(
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          startTime.hh,
          startTime.mm
        ),
        { timeZone: coachTimezone }
      ),
      end: convertToLocalTime(
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          endTime.hh,
          endTime.mm
        ),
        { timeZone: coachTimezone }
      ),
    })
  );

  const slots = [...todaySlots, ...tomorrowSlots]
    .flatMap(({ start, end }) => {
      const out: Date[] = [];
      let date = start;
      while (addMinutes(date, duration) < end) {
        out.push(date);
        date = addMinutes(date, duration);
      }
      return out;
    })
    .filter(
      (d) => isSameDay(date, d) && isAfter(d, addHours(now, hoursBuffer))
    );

  return slots;
};
