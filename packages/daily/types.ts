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

// Meetings

export interface Meeting {
  id: string;
  room: string;
  start_time: number;
  end_time: number;
  duration: number;
  ongoing: boolean;
  max_participants: number;
  participant_minutes: number;
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

// Transcripts

export interface Transcript {
  transcriptId: string;
  domainId: string;
  roomId: string;
  mtgSessionId: string;
  duration: number;
  status: "t_finished" | "t_in-progress" | "t_error";
}

export interface TranscriptAccessLink {
  transcriptId: string;
  link: string;
  s3: {
    key: string;
    bucket: string;
    region: string;
  };
}
