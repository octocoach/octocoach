"use client";

import {
  DailyEventObjectActiveSpeakerChange,
  DailyEventObjectParticipant,
} from "@daily-co/daily-js";
import {
  ScreenShare,
  useLocalSessionId,
  useParticipantIds,
  useScreenShare,
} from "@daily-co/daily-react";
import { useEffect, useState } from "react";
import { callClass, localVideoTile, mainTileClass } from "./call.css";
import { Tile } from "./tile";
import { Tray } from "./tray";

export const Call = ({ leaveCall }: { leaveCall: () => Promise<void> }) => {
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenShare | null>(null);

  const onActiveSpeakerChange = ({
    activeSpeaker,
  }: DailyEventObjectActiveSpeakerChange) => {
    setActiveSpeakerId(activeSpeaker.peerId);
  };

  const onParticipantJoined = ({
    participant,
  }: DailyEventObjectParticipant) => {
    if (participant.local) {
      setActiveSpeakerId(participant.session_id);
    }
  };

  const { screens, isSharingScreen } = useScreenShare();

  useEffect(() => {
    const remoteScreens = screens.filter((screen) => !screen.local);
    if (remoteScreens.length < 1) {
      setActiveScreen(null);
    }

    setActiveScreen(remoteScreens[0]);
  }, [screens]);

  const remoteParticipantsIds = useParticipantIds({
    filter: "remote",
    onActiveSpeakerChange,
    onParticipantJoined,
  });
  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantsIds.length < 1 || screens.length < 1;

  return (
    <>
      <div className={callClass}>
        <div className={mainTileClass}>
          {activeScreen ? (
            <Tile
              id={activeScreen.session_id}
              key={activeScreen.screenId}
              isScreenShare
            />
          ) : (
            <Tile
              id={activeSpeakerId || localSessionId}
              isAlone={isAlone}
              isLocal={!activeSpeakerId}
            />
          )}
          {activeSpeakerId && !isAlone && (
            <div className={localVideoTile}>
              <Tile id={localSessionId} isAlone={isAlone} isLocal />
            </div>
          )}
        </div>
        <Tray leaveCall={leaveCall} />
      </div>
    </>
  );
};
