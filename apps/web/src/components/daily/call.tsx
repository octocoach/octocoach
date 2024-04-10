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
import { useEffect, useMemo, useState } from "react";
import {
  callClass,
  localVideoTile,
  mainTileClass,
  thumbsTileClass,
} from "./call.css";
import { Tile } from "./tile";
import { Tray } from "./tray";

export const Call = ({ leaveCall }: { leaveCall: () => Promise<void> }) => {
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenShare | null>(null);
  const [remoteScreens, setRemoteScreens] = useState<ScreenShare[]>([]);

  const onActiveSpeakerChange = ({
    activeSpeaker,
  }: DailyEventObjectActiveSpeakerChange) => {
    if (activeSpeaker.peerId !== localSessionId) {
      setActiveSpeakerId(activeSpeaker.peerId);
    }
  };

  const onParticipantJoined = ({
    participant,
  }: DailyEventObjectParticipant) => {
    if (!participant.local) {
      setActiveSpeakerId(participant.session_id);
    }
  };

  const { screens } = useScreenShare();

  useEffect(() => {
    setRemoteScreens(screens.filter((screen) => !screen.local));
  }, [screens]);

  useEffect(() => {
    if (!remoteScreens[0]) {
      setActiveScreen(null);
      return;
    }

    setActiveScreen(remoteScreens[0]);
  }, [remoteScreens]);

  const remoteParticipantsIds = useParticipantIds({
    filter: "remote",
    onActiveSpeakerChange,
    onParticipantJoined,
  });
  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantsIds.length < 1 || remoteScreens.length < 1;

  const thumbnailTiles = useMemo(() => {
    return [
      ...remoteScreens
        .filter(({ session_id }) => session_id !== activeScreen?.session_id)
        .map(({ session_id }) => ({ id: session_id, isScreenShare: true })),
      ...remoteParticipantsIds
        .filter((id) => !!activeScreen || id !== activeSpeakerId)
        .map((id) => ({ id, isScreenShare: false })),
    ];
  }, [
    remoteScreens,
    remoteParticipantsIds,
    activeScreen,
    activeScreen?.session_id,
    activeSpeakerId,
  ]);

  return (
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
        {activeSpeakerId && (
          <div className={localVideoTile}>
            <Tile id={localSessionId} isAlone={isAlone} isLocal />
          </div>
        )}
      </div>
      {thumbnailTiles.length ? (
        <div className={thumbsTileClass}>
          {thumbnailTiles.map(({ id, isScreenShare }) => (
            <Tile key={id} id={id} isScreenShare={isScreenShare} />
          ))}
        </div>
      ) : null}

      <Tray leaveCall={leaveCall} />
    </div>
  );
};
