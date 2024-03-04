import {
  Interval,
  addMinutes,
  areIntervalsOverlapping,
  format,
} from "date-fns";
import { availability } from "./constants";

export const isAvailable = (date: Date, busy: Interval[]): boolean => {
  const day = date.getDay();
  const slots = availability[day];

  const slotAvailable = slots.some((slot) => {
    const currentSlot: Interval = {
      start: date,
      end: addMinutes(date, 30),
    };
    const availabilitySlot: Interval = {
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        slot.startTime.hh,
        slot.startTime.mm
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        slot.endTime.hh,
        slot.endTime.mm
      ),
    };

    return areIntervalsOverlapping(availabilitySlot, currentSlot);
  });

  const hasMeeting = busy.some((coachMeeting) => {
    const currentSlot = { start: date, end: addMinutes(date, 45) };
    return areIntervalsOverlapping(coachMeeting, currentSlot);
  });

  return slotAvailable && !hasMeeting;
};

export const getMonthName = (monthIndex: number) => {
  const date = new Date();
  date.setMonth(monthIndex);
  return format(date, "MMMM");
};
