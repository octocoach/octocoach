import { PreviousFilled, NextFilled } from "@carbon/icons-react";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { getMonthName } from "./helpers";
import { Button } from "../Button/Button";
import { Dispatch, SetStateAction } from "react";
import { Locales } from "@octocoach/i18n/src/i18n-types";

export const CalendarNavigation = ({
  month,
  year,
  setMonth,
  setYear,
  locale,
}: {
  year: number;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
  locale: Locales;
}) => {
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  };

  return (
    <Stack direction="horizontal" align="center" justify="between" fullWidth>
      <Stack direction="horizontal" fullWidth>
        <Text size="l" weight="heavy" variation="casual">
          {getMonthName(month, locale)}
        </Text>
        <Text size="l" weight="light">
          {year}
        </Text>
      </Stack>
      <Stack spacing="tight" direction="horizontal">
        <Button size="small" onClick={prevMonth} color="subtle">
          <PreviousFilled />
        </Button>
        <Button size="small" onClick={nextMonth} color="subtle">
          <NextFilled />
        </Button>
      </Stack>
    </Stack>
  );
};
