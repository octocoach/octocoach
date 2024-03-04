import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import type { Slot, Availability } from "./types";

export const hoursBuffer = 12;

export const workDay: Slot = {
  startTime: {
    hh: 9,
    mm: 0,
  },
  endTime: {
    hh: 17,
    mm: 0,
  },
};

export const morning: Slot = {
  startTime: {
    hh: 9,
    mm: 0,
  },
  endTime: {
    hh: 11,
    mm: 30,
  },
};

export const afternoon: Slot = {
  startTime: {
    hh: 13,
    mm: 0,
  },
  endTime: {
    hh: 17,
    mm: 0,
  },
};

export const availability: Availability = {
  0: [],
  1: [workDay],
  2: [workDay],
  3: [morning, afternoon],
  4: [afternoon],
  5: [workDay],
  6: [],
};
