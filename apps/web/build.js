import { mkdirSync, cpSync } from "fs";

console.log("Copying drizzle-kit");

try {
  mkdirSync("drizzle-kit");
  cpSync("node_modules/drizzle-kit", "drizzle_kit", { recursive: true });
} catch (err) {
  console.error("Error while copying drizzle-kit", err);
}

console.log("Done!");
