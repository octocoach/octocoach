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

  private request(method: "GET" | "POST", endpoint: string, body: any) {
    return fetch(`https://api.daily.co/v1/${endpoint}`, {
      method,
      body: JSON.stringify(body),
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

  async createMeetingToken(properties: MeetingTokenOptions) {
    const res = await this.request("POST", "meeting-tokens", {
      properties,
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to create meeting token");
    }

    const { token }: MeetingToken = await res.json();

    return token;
  }
}
