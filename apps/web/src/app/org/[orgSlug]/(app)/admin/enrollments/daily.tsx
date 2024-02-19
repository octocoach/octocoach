"use client";

import { HairCheck } from "@components/daily/hair-check";
import DailyIFrame, { DailyCall } from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react";
import { Room } from "@octocoach/daily/types";
import { useEffect, useState } from "react";

export const Daily = ({ room, token }: { room: Room; token: string }) => {
  const [callObject, setCallObject] = useState<DailyCall>();

  useEffect(() => {
    if (!window || !room || !token) return;

    const callObject =
      DailyIFrame.getCallInstance() || DailyIFrame.createCallObject();

    setCallObject(callObject);

    callObject.preAuth({
      url: room.url,
      token,
    });
  }, [room, token]);

  const onJoinCall = () => {
    callObject?.join({ url: room.url, token });
  };

  if (!callObject) return null;

  return (
    <DailyProvider callObject={callObject}>
      <HairCheck onJoinCall={onJoinCall} />
    </DailyProvider>
  );
};
