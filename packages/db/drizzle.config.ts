import type { Config } from "drizzle-kit";

const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const ssl = process.env.NODE_ENV === "production" ? true : false;

if (!host || !port || !user || !password || !database) {
  throw new Error("POSTGRES vars is not set");
}

export default {
  schema: "./schemas/public/schema.ts",
  out: "./migrations-public",
  driver: "pg",
  dbCredentials: {
    database,
    host,
    port: parseInt(port),
    user,
    password,
    ssl,
  },
} satisfies Config;
