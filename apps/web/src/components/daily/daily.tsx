"use client";

import { HairCheck } from "@components/daily/hair-check";
import DailyIFrame, { DailyCall } from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react";
import { Room } from "@octocoach/daily/types";
import { useEffect, useState } from "react";

export const Daily = ({
  roomName,
  token,
}: {
  roomName: Room["name"];
  token: string;
}) => {
  const mkUrl = (roomName: string) => `https://octocoach.daily.co/${roomName}`;

  const [callObject, setCallObject] = useState<DailyCall>();

  useEffect(() => {
    if (!window || !roomName || !token) return;

    const callObject =
      DailyIFrame.getCallInstance() || DailyIFrame.createCallObject();

    setCallObject(callObject);

    callObject.preAuth({
      url: mkUrl(roomName),
      token,
    });
  }, [roomName, token]);

  const onJoinCall = () => {
    callObject?.join({ url: mkUrl(roomName), token });
  };

  if (!callObject) return null;

  return (
    <DailyProvider callObject={callObject}>
      <HairCheck onJoinCall={onJoinCall} />
    </DailyProvider>
  );
};
