import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { jwtDecode } from "jwt-decode";
import { Daily } from ".";

describe("Testing Daily...", () => {
  let daily: Daily;

  beforeAll(() => {
    daily = new Daily();
  });

  it("Can create a random Room Name", () => {
    const roomName = daily.createRoomName();

    expect(roomName).toMatch(/^[a-z]{3}-[a-z]{3}-[a-z]{3}$/);
  });

  it("Can create, list and delete rooms", async () => {
    const testRoomName = `test-${daily.createRoomName()}`;

    const room = await daily.createRoom({
      name: testRoomName,
      privacy: "private",
      autoTranscription: true,
    });

    expect(room.name).toEqual(testRoomName);

    let rooms = await daily.listRooms();
    expect(rooms.find((room) => room.name === testRoomName)).toBeTruthy();

    await daily.deleteRoom(testRoomName);
    rooms = await daily.listRooms();
    expect(rooms.find((room) => room.name == testRoomName)).toBeFalsy();
  });

  it("Can create a meeting token", async () => {
    const autoStartTranscription = true;
    const roomName = `test-${daily.createRoomName()}`;
    const userName = "Test User";
    const userId = "test-user";
    const isOwner = false;

    await daily.createRoom({
      name: roomName,
      privacy: "private",
    });

    const token = await daily.createMeetingToken({
      autoStartTranscription,
      roomName,
      isOwner,
      userName,
      userId,
    });

    const decoded: {
      r: string;
      o: boolean;
      u: string;
      ud: string;
      d: string;
      iat: number;
    } = jwtDecode(token);

    expect(token).toBeTypeOf("string");
    expect(decoded.r).toEqual(roomName);
    expect(decoded.o).toEqual(isOwner);
    expect(decoded.u).toEqual(userName);
    expect(decoded.ud).toEqual(userId);
    expect(decoded.d).toBeTypeOf("string");
    expect(decoded.iat).toBeGreaterThan(0);
  });

  it("Can list meetings for a given room", async () => {
    const roomName = `test-${daily.createRoomName()}`;
    await daily.createRoom({ name: roomName, privacy: "private" });

    const meetings = await daily.listMeetings({ roomName });

    expect(meetings).toHaveLength(0);
  });

  afterAll(async () => {
    console.log("🧹 Cleaning Up!");
    const rooms = await daily.listRooms();
    for (const room of rooms) {
      if (room.name.startsWith("test")) {
        console.log(`Daleting ${room.name}`);
        await daily.deleteRoom(room.name);
      }
    }
  });
});
