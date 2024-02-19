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
  room_name: string;
  is_owner: boolean;
}

export interface MeetingToken {
  token: string;
}
