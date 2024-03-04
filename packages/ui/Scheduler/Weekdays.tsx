import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Text } from "../Text/Text";

export const WeekdaysHeading = () => {
  const [weekdays, setWeekdays] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    setWeekdays(
      eachDayOfInterval({ start, end }).map((day) => format(day, "EEE"))
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
