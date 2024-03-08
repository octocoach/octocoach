import { Locales } from "@octocoach/i18n/src/i18n-types";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Text } from "../Text/Text";
import { getLocale } from "./helpers";

export const WeekdaysHeading = ({ locale }: { locale: Locales }) => {
  const [weekdays, setWeekdays] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    setWeekdays(
      eachDayOfInterval({ start, end }).map((day) =>
        format(day, "EEE", { locale: getLocale(locale) })
      )
    );
  }, []);

  return (
    <>
      {weekdays.map((weekday) => (
        <Text key={weekday} textAlign="center" weight="light">
          {weekday.toUpperCase()}
        </Text>
      ))}
    </>
  );
};
