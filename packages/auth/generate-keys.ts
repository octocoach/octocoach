import { randomBytes } from "node:crypto";

const key = randomBytes(32).toString("hex").slice(0, 32);
const iv = randomBytes(16).toString("hex").slice(0, 16);

console.log(`${key}:${iv}`);
