export type Privacy = "public" | "private";

// Rooms

export interface RoomOptions {
  name?: string;
  privacy?: Privacy;
}

export interface Room {
  id: string;
  name: string;
  url: string;
  privacy: Privacy;
}

// Meeting Tokens

export interface MeetingTokenOptions {
  roomName: string;
  isOwner: boolean;
  userName: string;
  userId: string;
}

export interface MeetingToken {
  token: string;
}
