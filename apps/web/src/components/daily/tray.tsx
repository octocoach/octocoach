import {
  useAudioTrack,
  useDaily,
  useLocalSessionId,
  useScreenShare,
  useVideoTrack,
} from "@daily-co/daily-react";
import { Button, Card, Stack } from "@octocoach/ui";
import {
  MicrophoneFilled,
  MicrophoneOffFilled,
  PhoneBlockFilled,
  Screen,
  VideoFilled,
  VideoOffFilled,
} from "@octocoach/ui/icons";
import { useCallback } from "react";
import { trayClass } from "./tray.css";

export const Tray = ({ leaveCall }: { leaveCall: () => Promise<void> }) => {
  const callObject = useDaily();

  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();
  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject?.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject?.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  return (
    <div className={trayClass}>
      <Card>
        <Stack direction="horizontal" justify="around" wrap>
          <Button
            onClick={toggleVideo}
            color={mutedVideo ? "error" : "success"}
          >
            {mutedVideo ? (
              <VideoOffFilled size={24} />
            ) : (
              <VideoFilled size={24} />
            )}
          </Button>
          <Button
            onClick={toggleAudio}
            color={mutedAudio ? "error" : "success"}
          >
            {mutedAudio ? (
              <MicrophoneOffFilled size={24} />
            ) : (
              <MicrophoneFilled size={24} />
            )}
          </Button>
          <Button
            onClick={toggleScreenShare}
            color={isSharingScreen ? "contrast" : "brand"}
          >
            <Screen size={24} />
          </Button>
          <Button onClick={leaveCall} color="error">
            <PhoneBlockFilled size={24} />
          </Button>
        </Stack>
      </Card>
    </div>
  );
};
