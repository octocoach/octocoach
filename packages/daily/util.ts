import { Daily } from ".";
import { Room } from "./types";

const daily = new Daily();

const roomsToKeep: Room["name"][] = [
  "rxg-lwj-xfa",
  "pht-ghb-svv",
  "hos-ucq-rdx",
  "idr-wed-iqa",
];

const rooms = await daily.listRooms();

for (const room of rooms) {
  if (roomsToKeep.includes(room.name)) {
    console.log(`✅ Keeping Room ${room.name}`);
    continue;
  }
  console.log(`🛑 Deleting Room ${room.name}`);
  await daily.deleteRoom(room.name);
}
