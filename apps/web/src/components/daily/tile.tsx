"use client";

import { DailyVideo, useVideoTrack } from "@daily-co/daily-react";
import { tileClass } from "./tile.css";
import { Username } from "./username";

export const Tile = ({
  id,
  isScreenShare,
  isLocal,
  isAlone,
}: {
  id: string;
  isScreenShare?: boolean;
  isAlone?: boolean;
  isLocal?: boolean;
}) => {
  const videoState = useVideoTrack(id);

  return (
    <div className={tileClass}>
      <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? "screenVideo" : "video"}
      />
      {!isScreenShare && <Username id={id} isLocal={isLocal} />}
    </div>
  );
};
