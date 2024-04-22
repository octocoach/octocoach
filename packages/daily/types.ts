export type Privacy = "public" | "private";

// Rooms

export interface RoomProperties {
  enable_transcription_storage?: boolean;
  auto_transcription_settings?: {
    model?: "nova-2";
    extra?: {
      detect_language?: boolean;
    };
  };
}

export interface RoomOptions {
  name: string;
  privacy: Privacy;
  autoTranscription?: boolean;
}

export interface Room {
  id: string;
  name: string;
  url: string;
  privacy: Privacy;
}

// Meeting Tokens

export interface MeetingTokenOptions {
  autoStartTranscription: boolean;
  roomName: string;
  isOwner: boolean;
  userName: string;
  userId: string;
}

export interface MeetingToken {
  token: string;
}
