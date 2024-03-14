import { CircleFilled, Misuse } from "@carbon/icons-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Interval, format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { vars } from "../theme.css";
import { availability, coachTimezone, duration } from "./constants";
import { getLocale, getSlots, isAvailable } from "./helpers";
import { timeslotsContainer, timeslotsContent } from "./timeslots.css";

export const Timeslots = ({
  selectedDate,
  setSelectedTimeslot,
  busyIntervals,
  creatingMeeting,
  locale,
  hoursBuffer,
}: {
  selectedDate: Date;
  setSelectedTimeslot: Dispatch<SetStateAction<Date | undefined>>;
  busyIntervals: Interval[];
  creatingMeeting: boolean;
  locale: Locales;
  hoursBuffer: number;
}) => {
  const [timeslots, setTimeslots] = useState<Date[]>([]);

  useEffect(() => {
    const slots = getSlots({
      availability,
      coachTimezone,
      date: selectedDate,
      duration: 30,
    });
    setTimeslots(slots);
  }, [selectedDate]);

  return (
    <div className={timeslotsContainer}>
      <Text size="l" weight="light" variation="casual">
        {format(selectedDate, "EEE d", { locale: getLocale(locale) })}
      </Text>
      <div className={timeslotsContent}>
        {timeslots.map((timeslot) => {
          const available = isAvailable(timeslot, duration, busyIntervals);

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
