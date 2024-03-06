"use client";

import { HairCheck } from "@components/daily/hair-check";
import DailyIFrame, { DailyCall } from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react";
import { Room } from "@octocoach/daily/types";
import { useEffect, useState } from "react";
import { Call } from "./call";
import { CallState } from "./types";

export const Daily = ({
  roomName,
  token,
}: {
  roomName: Room["name"];
  token: string;
}) => {
  const mkUrl = (roomName: string) => `https://octocoach.daily.co/${roomName}`;

  const [callObject, setCallObject] = useState<DailyCall>();
  const [callState, setCallState] = useState<CallState>("idle");

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

  const onJoinCall = async () => {
    if (!callObject) return;
    setCallState("joining");
    await callObject.join({ url: mkUrl(roomName), token });
    setCallState("joined");
  };

  const onLeaveCall = async () => {
    if (!callObject) return;
    setCallState("leaving");
    await callObject.leave();
    setCallState("idle");
  };

  if (!callObject) return null;

  const renderCall = () => {
    switch (callState) {
      case "idle":
        return <HairCheck onJoinCall={onJoinCall} />;
      case "joined":
        return <Call onLeaveCall={onLeaveCall} />;
    }
  };

  return <DailyProvider callObject={callObject}>{renderCall()}</DailyProvider>;
};
