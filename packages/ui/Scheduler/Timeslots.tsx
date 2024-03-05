import {
  Interval,
  addMinutes,
  format,
  isPast,
  setHours,
  subHours,
} from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { availability, hoursBuffer } from "./constants";
import { getLocale, isAvailable } from "./helpers";
import { timeslotsContainer, timeslotsContent } from "./timeslots.css";
import { Locales } from "@octocoach/i18n/src/i18n-types";

export const Timeslots = ({
  selectedDate,
  onCreateMeeting,
  busyIntervals,
  creatingMeeting,
  locale,
}: {
  selectedDate: Date;
  onCreateMeeting: (date: Date) => void;
  busyIntervals: Interval[];
  creatingMeeting: boolean;
  locale: Locales;
}) => {
  const [timeslots, setTimeslots] = useState<Date[]>([]);

  useEffect(() => {
    const availableSlots = availability[selectedDate.getDay()];

    const startHour = Math.min(
      ...availableSlots.map((slot) => slot.startTime.hh)
    );

    const endHour = Math.max(...availableSlots.map((slot) => slot.endTime.hh));

    let date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      startHour,
      0
    );

    const end = setHours(date, endHour);

    const slots: Date[] = [];

    while (date <= end) {
      slots.push(date);
      date = addMinutes(date, 30);
    }
    setTimeslots(slots);
  }, [selectedDate]);

  return (
    <div className={timeslotsContainer}>
      <Text size="l" weight="light" variation="casual">
        {format(selectedDate, "EEE d", { locale: getLocale(locale) })}
      </Text>
      <div className={timeslotsContent}>
        {timeslots.map((timeslot) => (
          <Button
            key={format(timeslot, "HH:mm")}
            color="accent"
            size="small"
            disabled={
              isPast(subHours(timeslot, hoursBuffer)) ||
              !isAvailable(timeslot, busyIntervals) ||
              creatingMeeting
            }
            onClick={() => onCreateMeeting(timeslot)}
          >
            {format(timeslot, "HH:mm")}
          </Button>
        ))}
      </div>
    </div>
  );
};
