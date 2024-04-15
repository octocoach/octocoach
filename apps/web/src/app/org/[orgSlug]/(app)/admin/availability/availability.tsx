"use client";

import {
  Availability,
  DayIndex,
  Slot,
  Time,
} from "@octocoach/db/schemas/org/coach";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import { getEntries } from "@octocoach/tshelpers";
import { Button, Card, Select, SelectItem, Stack, Text } from "@octocoach/ui";
import { getLocale } from "@octocoach/ui/Scheduler/helpers";
import { AddFilled, TrashCan } from "@octocoach/ui/icons";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { useMemo } from "react";

const padZeros = (n: number) => String(n).padStart(2, "0");

const hours = Array.from(Array(24).keys()).map(padZeros);
const minutes = Array.from(Array(4).keys()).map((n) => padZeros(n * 15));

const EditTime = ({
  time,
  setTime,
}: {
  time: Time;
  setTime: (time: Time) => void;
}) => {
  return (
    <Stack direction="horizontal" spacing="tight" align="center" justify="left">
      <Select defaultValue={padZeros(time.hh)}>
        {hours.map((hour) => (
          <SelectItem
            key={hour}
            value={hour}
            setValueOnClick={() => {
              setTime({ ...time, hh: Number(hour) });
              return true;
            }}
          />
        ))}
      </Select>
      <Text>:</Text>
      <Select defaultValue={padZeros(time.mm)}>
        {minutes.map((minute) => (
          <SelectItem
            key={minute}
            value={`${minute}`}
            setValueOnClick={() => {
              setTime({ ...time, mm: Number(minute) });
              return true;
            }}
          />
        ))}
      </Select>
    </Stack>
  );
};

const EditSlot = ({
  slot,
  setSlot,
  deleteSlot,
}: {
  slot: Slot;
  setSlot: (slot: Slot) => void;
  deleteSlot: () => void;
}) => (
  <Stack direction="horizontal" align="center" justify="left">
    <EditTime
      time={slot.startTime}
      setTime={(time) => setSlot({ ...slot, startTime: time })}
    />
    <Text>-</Text>
    <EditTime
      time={slot.endTime}
      setTime={(time) => setSlot({ ...slot, endTime: time })}
    />
    <Button onClick={deleteSlot}>
      <TrashCan />
    </Button>
  </Stack>
);

export const EditAvailability = ({
  availability,
  setAvailability,
  locale,
}: {
  availability: Availability | null;
  setAvailability: (availavility: Availability) => void;
  locale: Locales;
}) => {
  const weekdays = useMemo(() => {
    const date = new Date();
    const start = startOfWeek(date);
    const end = endOfWeek(date);

    const dayNames = eachDayOfInterval({ start, end }).map((day) =>
      format(day, "EEE", { locale: getLocale(locale) })
    );
    return dayNames;
  }, [locale]);

  const getWeekDay = (day: number) => weekdays[day];

  if (!availability) return null;

  const onAddSlot = (day: DayIndex) => {
    const newAvailability = { ...availability };
    newAvailability[day] = [
      ...availability[day],
      { startTime: { hh: 9, mm: 0 }, endTime: { hh: 17, mm: 0 } },
    ];
    setAvailability(newAvailability);
  };

  return (
    <div>
      <Text size="xl">Set your available hours</Text>
      <Stack>
        {getEntries(availability).map(([day, slots]) => (
          <Card key={day}>
            <Stack>
              <Text size="l" weight="heavy" variation="casual">
                {getWeekDay(day)}
              </Text>
              <Stack>
                {slots.map((slot, key) => (
                  <EditSlot
                    key={`${key}-${slot.startTime.hh}${slot.startTime.mm}`}
                    slot={slot}
                    setSlot={(slot) => {
                      const newAvailability = { ...availability };
                      newAvailability[day][key] = slot;
                      setAvailability(newAvailability);
                    }}
                    deleteSlot={() => {
                      const newAvailability = { ...availability };
                      newAvailability[day] = newAvailability[day].filter(
                        (_slot, idx) => key !== idx
                      );
                      setAvailability(newAvailability);
                    }}
                  />
                ))}
              </Stack>
              <Stack direction="horizontal" justify="right">
                <Button onClick={() => onAddSlot(day)}>
                  <AddFilled />
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </div>
  );
};
