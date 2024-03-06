"use client";

import { DailyVideo, useVideoTrack } from "@daily-co/daily-react";

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
    <div
      style={{
        width: 480,
        height: 270,
        position: "relative",
      }}
    >
      <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? "screenVideo" : "video"}
      />
    </div>
  );
};
