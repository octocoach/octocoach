"use client";

import {
  useLocalSessionId,
  useParticipantIds,
  useScreenShare,
} from "@daily-co/daily-react";
import { Stack } from "@octocoach/ui";
import { callClass } from "./call.css";
import { Tile } from "./tile";

export const Call = () => {
  const { screens } = useScreenShare();
  const remoteParticipantsIds = useParticipantIds({ filter: "remote" });

  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantsIds.length < 1 || screens.length < 1;

  return (
    <Stack>
      <div className={callClass}>
        <Tile id={localSessionId} isAlone={isAlone} isLocal />
        {remoteParticipantsIds.map((id) => (
          <Tile id={id} key={id} />
        ))}
        {screens.map(({ screenId, session_id }) => (
          <Tile id={session_id} key={screenId} isScreenShare />
        ))}
      </div>
    </Stack>
  );
};
