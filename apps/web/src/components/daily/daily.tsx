"use client";

import { HairCheck } from "@components/daily/hair-check";
import DailyIFrame, { DailyAccess, DailyCall } from "@daily-co/daily-js";
import { DailyAudio, DailyProvider } from "@daily-co/daily-react";
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
  const [access, setAccess] = useState<DailyAccess>("unknown");

  useEffect(() => {
    if (!window || !roomName || !token) return;

    const callObject =
      DailyIFrame.getCallInstance() || DailyIFrame.createCallObject();

    setCallObject(callObject);

    if (callState === "idle" && access === "unknown") {
      void callObject
        .preAuth({
          url: mkUrl(roomName),
          token,
        })
        .then(({ access }) => setAccess(access));
    }
  }, [roomName, token, callState, access]);

  const joinCall = async () => {
    if (!callObject) return;
    setCallState("joining");
    await callObject.join({ url: mkUrl(roomName), token });
    setCallState("joined");
  };

  const leaveCall = async () => {
    if (!callObject) return;
    setCallState("leaving");
    await callObject.leave();
    setCallState("idle");
  };

  if (!callObject) return null;

  const renderCall = () => {
    switch (callState) {
      case "idle":
        return <HairCheck joinCall={joinCall} />;
      case "joined":
        return (
          <>
            <Call leaveCall={leaveCall} />
            <DailyAudio />
          </>
        );
    }
  };

  return <DailyProvider callObject={callObject}>{renderCall()}</DailyProvider>;
};
