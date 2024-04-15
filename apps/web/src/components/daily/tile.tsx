"use client";

import { DailyVideo, useVideoTrack } from "@daily-co/daily-react";
import { tileClass, tileVideoClass } from "./tile.css";
import { Username } from "./username";

export const Tile = ({
  id,
  isScreenShare,
  isLocal,
}: {
  id: string;
  isScreenShare?: boolean;
  isAlone?: boolean;
  isLocal?: boolean;
}) => {
  const _videoState = useVideoTrack(id);

  return (
    <div className={tileClass}>
      <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? "screenVideo" : "video"}
        className={tileVideoClass}
      />
      {!isScreenShare && <Username id={id} isLocal={isLocal} />}
    </div>
  );
};
