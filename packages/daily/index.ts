import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import { type $Fetch, ofetch } from "ofetch";

import { cleanWebVTT } from "./helpers/webvtt";
import type {
  Meeting,
  MeetingToken,
  MeetingTokenOptions,
  Room,
  RoomOptions,
  RoomProperties,
  Transcript,
  TranscriptAccessLink,
} from "./types";

export class Daily {
  private fetch: $Fetch;

  constructor(apiKey: string | undefined = process.env.DAILY_KEY) {
    if (!apiKey) {
      throw new Error(
        "You must provide a Daily API key or set DAILY_KEY in the environment"
      );
    }

    this.fetch = ofetch.create({
      baseURL: "https://api.daily.co/v1",
      headers: { Authorization: `Bearer ${apiKey}` },
      retry: 3,
      retryDelay: 500,
    });
  }

  async createRoom(options: RoomOptions) {
    const body: RoomOptions & { properties?: RoomProperties } = {
      name: options.name,
      privacy: options.privacy,
    };

    if (options.autoTranscription) {
      body.properties = {
        enable_transcription_storage: true,
      };
    }

    return await this.fetch<Room>("/rooms", {
      method: "POST",
      body,
    });
  }

  async listRooms() {
    const { data } = await this.fetch<{ data: Room[] }>("/rooms");

    return data;
  }

  async getRoom(roomName: Room["name"]) {
    return await this.fetch<Room>(`/rooms/${roomName}`);
  }

  async deleteRoom(roomName: Room["name"]) {
    await this.fetch(`rooms/${roomName}`, { method: "DELETE" });
  }

  async listMeetings({ roomName }: { roomName: string }) {
    const { data } = await this.fetch<{ data: Meeting[] }>("meetings", {
      params: { room: roomName },
    });
    return data;
  }

  async getMeeting(id: string) {
    return this.fetch<Meeting>(`meetings/${id}`);
  }

  async createMeetingToken(options: MeetingTokenOptions) {
    const { token } = await this.fetch<MeetingToken>("/meeting-tokens", {
      method: "POST",
      body: {
        properties: {
          auto_start_transcription: options.autoStartTranscription,
          room_name: options.roomName,
          is_owner: options.isOwner,
          user_name: options.userName,
          user_id: options.userId,
        },
      },
    });

    return token;
  }

  createRoomName() {
    const nameSlice = customAlphabet(lowercase, 3);
    return `${nameSlice()}-${nameSlice()}-${nameSlice()}`;
  }

  async listTranscripts({
    roomName,
    meetingId,
  }: {
    roomName?: string;
    meetingId?: string;
  }) {
    const params: Record<string, string> = {};

    if (roomName) {
      const room = await this.getRoom(roomName);

      if (!room) throw new Error(`Room ${roomName} not found`);

      params.roomId = room.id;
    }

    if (meetingId) {
      params.mtgSessionId = meetingId;
    }

    const { data } = await this.fetch<{
      data: Transcript[];
    }>("/transcript", { params });

    return data;
  }

  async getTranscriptLink(id: string) {
    const { link } = await this.fetch<TranscriptAccessLink>(
      `/transcript/${id}/access-link`
    );
    return link;
  }

  async getTranscriptContent(id: string) {
    const link = await this.getTranscriptLink(id);
    const text = await ofetch<string>(link, { retryDelay: 500, retry: 3 });

    const cleaned = cleanWebVTT(text);

    return cleaned;
  }
}
