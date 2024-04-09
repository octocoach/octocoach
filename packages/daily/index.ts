import { MeetingToken, MeetingTokenOptions, Room, RoomOptions } from "./types";

export class Daily {
  private apiKey: string;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey;
    } else if (process.env.DAILY_KEY) {
      this.apiKey = process.env.DAILY_KEY;
    } else {
      throw new Error(
        "You must provide a Daily API key or set DAILY_KEY in the environment"
      );
    }
  }

  private request(
    method: "GET" | "POST" | "DELETE",
    endpoint: string,
    body?: any
  ) {
    return fetch(`https://api.daily.co/v1/${endpoint}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
  }

  async createRoom(options: RoomOptions) {
    const res = await this.request("POST", "rooms", options);

    if (!res.ok) {
      throw new Error("Failed to create room");
    }

    const room: Room = await res.json();

    return room;
  }

  async listRooms() {
    const res = await this.request("GET", "rooms");
    if (!res.ok) {
      console.error(res.text());
      throw new Error("Failed to fecth rooms");
    }

    const { data }: { data: Room[] } = await res.json();
    return data;
  }

  async deleteRoom(roomName: Room["name"]) {
    const res = await this.request("DELETE", `rooms/${roomName}`);
    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Could not delete room");
    }

    console.log(`Room ${roomName} deleted`);
  }

  async createMeetingToken(options: MeetingTokenOptions) {
    const res = await this.request("POST", "meeting-tokens", {
      properties: {
        room_name: options.roomName,
        is_owner: options.isOwner,
        user_name: options.userName,
        user_id: options.userId,
      },
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to create meeting token");
    }

    const { token }: MeetingToken = await res.json();

    return token;
  }
}
