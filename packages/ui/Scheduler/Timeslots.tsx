import { CircleFilled, Misuse } from "@carbon/icons-react";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { Interval, format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Center } from "../Center/Center";
import { Spinner } from "../Spinner/Spinner";
import { Text } from "../Text/Text";
import { vars } from "../theme.css";
import { availability, coachTimezone, duration } from "./constants";
import { getLocale, getSlots, isAvailable } from "./helpers";
import { timeslotsContainer, timeslotsContent } from "./timeslots.css";

export const Timeslots = ({
  selectedDate,
  setSelectedTimeslot,
  getBusyIntervals,
  creatingMeeting,
  locale,
  hoursBuffer,
}: {
  selectedDate: Date;
  setSelectedTimeslot: Dispatch<SetStateAction<Date | undefined>>;
  getBusyIntervals: (date: Date) => Promise<Interval[]>;
  creatingMeeting: boolean;
  locale: Locales;
  hoursBuffer: number;
}) => {
  const [timeslots, setTimeslots] = useState<Date[]>([]);
  const [busyIntervals, setBusyIntervals] = useState<Interval[] | null>(null);

  useEffect(() => {
    setBusyIntervals(null);

    getBusyIntervals(selectedDate).then(setBusyIntervals);

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
      {busyIntervals ? (
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
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </div>
  );
};
