"use client";

import {
  DailyAudio,
  useLocalSessionId,
  useParticipantIds,
  useScreenShare,
} from "@daily-co/daily-react";
import { Button, Stack } from "@octocoach/ui";
import { Tile } from "./tile";

export const Call = ({ onLeaveCall }: { onLeaveCall: () => Promise<void> }) => {
  const { screens } = useScreenShare();
  const remoteParticipantsIds = useParticipantIds({ filter: "remote" });

  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantsIds.length < 1 || screens.length < 1;

  return (
    <>
      <Stack>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Tile id={localSessionId} isAlone={isAlone} />
          {remoteParticipantsIds.map((id) => (
            <Tile id={id} key={id} />
          ))}
          {screens.map(({ screenId }) => (
            <Tile id={screenId} isScreenShare key={screenId} />
          ))}
        </div>
        <Button onClick={onLeaveCall}>Leave Call</Button>
      </Stack>
      <DailyAudio />
    </>
  );
};
