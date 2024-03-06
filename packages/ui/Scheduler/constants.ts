import type { Availability, Slot } from "./types";

export const hoursBuffer = 12;

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

const workDay = [morning, afternoon];

export const availability: Availability = {
  0: [],
  1: [afternoon],
  2: workDay,
  3: workDay,
  4: workDay,
  5: [morning],
  6: [],
};
