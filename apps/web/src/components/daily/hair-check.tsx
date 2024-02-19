"use client";

import {
  DailyVideo,
  useDaily,
  useDevices,
  useLocalSessionId,
} from "@daily-co/daily-react";
import { Button, Select, SelectItem, Stack } from "@octocoach/ui";
import { useEffect } from "react";

export const HairCheck = ({ onJoinCall }: { onJoinCall: () => void }) => {
  const localSessionId = useLocalSessionId();
  const callObject = useDaily();
  const { microphones, setMicrophone, cameras, setCamera } = useDevices();

  useEffect(() => {
    callObject?.startCamera();
  }, [callObject]);

  if (!localSessionId) return null;

  return (
    <Stack fullWidth>
      <DailyVideo sessionId={localSessionId} mirror type="video" />
      <Stack direction="horizontal">
        <Select displayValue="Select Camera">
          {cameras.map((camera) => (
            <SelectItem
              key={camera.device.deviceId}
              value={camera.device.label}
              setValueOnClick={() => {
                setCamera(camera.device.deviceId);
                return true;
              }}
            />
          ))}
        </Select>
        <Select displayValue="Microphone">
          {microphones.map((microphone) => (
            <SelectItem
              key={microphone.device.deviceId}
              value={microphone.device.label}
              setValueOnClick={() => {
                setMicrophone(microphone.device.deviceId);
                return true;
              }}
            />
          ))}
        </Select>
        <Button onClick={onJoinCall}>Join</Button>
      </Stack>
    </Stack>
  );
};
