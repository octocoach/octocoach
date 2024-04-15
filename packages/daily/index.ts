import { $Fetch, ofetch } from "ofetch";
import { MeetingToken, MeetingTokenOptions, Room, RoomOptions } from "./types";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";

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

  async createRoom(body: RoomOptions) {
    return await this.fetch<Room>("/rooms", { method: "POST", body });
  }

  async listRooms() {
    const { data } = await this.fetch<{ data: Room[] }>("/rooms");

    return data;
  }

  async deleteRoom(roomName: Room["name"]) {
    await this.fetch(`rooms/${roomName}`, { method: "DELETE" });
  }

  async createMeetingToken(options: MeetingTokenOptions) {
    const { token } = await this.fetch<MeetingToken>("/meeting-tokens", {
      method: "POST",
      body: {
        properties: {
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
}
