import { CircleFilled, Misuse } from "@carbon/icons-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import {
  Interval,
  addMinutes,
  format,
  isFuture,
  setHours,
  subHours,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { vars } from "../theme.css";
import { availability, hoursBuffer } from "./constants";
import { getLocale, isAvailable } from "./helpers";
import { timeslotsContainer, timeslotsContent } from "./timeslots.css";

export const Timeslots = ({
  selectedDate,
  setSelectedTimeslot,
  busyIntervals,
  creatingMeeting,
  locale,
}: {
  selectedDate: Date;
  setSelectedTimeslot: Dispatch<SetStateAction<Date | undefined>>;
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

    while (date < end) {
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
        {timeslots.map((timeslot) => {
          const available =
            isAvailable(timeslot, busyIntervals) &&
            isFuture(subHours(timeslot, hoursBuffer));

          return (
            <Button
              key={format(timeslot, "HH:mm")}
              color="accent"
              size="small"
              disabled={!available || creatingMeeting}
              onClick={() => setSelectedTimeslot(timeslot)}
            >
              {available ? (
                <CircleFilled color={vars.color.typography.success} />
              ) : (
                <Misuse color={vars.color.typography.error} />
              )}
              {format(timeslot, "HH:mm")}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
