"use client";

import { Measure } from "@octocoach/db/schemas/org/measure";
import { Meeting } from "@octocoach/db/schemas/org/meeting";
import { Locales } from "@octocoach/i18n/src/i18n-types";
import Message from "@octocoach/i18n/src/react-message";
import { ButtonLink, Text } from "@octocoach/ui";
import { getLocale } from "@octocoach/ui/Scheduler/helpers";
import {
  addMinutes,
  formatDistanceToNow,
  minutesToMilliseconds,
} from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

export const JoinButton = ({
  baseUrl,
  measureId,
  meetingId,
  startTime,
  locale,
}: {
  baseUrl: string;
  measureId: Measure["id"];
  meetingId: Meeting["id"];
  startTime: Date;
  locale: Locales;
}) => {
  const [canJoin, setCanJoin] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkTime = () => {
      if (addMinutes(new Date(), 5) >= startTime) {
        setCanJoin(true);
      } else {
        setTime(formatDistanceToNow(startTime, { locale: getLocale(locale) }));
      }
    };

    checkTime();
    const interval = setInterval(checkTime, minutesToMilliseconds(1));

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  if (canJoin)
    return (
      <ButtonLink
        Element={Link}
        href={`${baseUrl}measures/${measureId}/meetings/${meetingId}`}
      >
        <Message id="meetings.join" />
      </ButtonLink>
    );

  return (
    <Text>
      <Message
        id="meetings.joinIn"
        params={{
          time,
        }}
      />
    </Text>
  );
};
