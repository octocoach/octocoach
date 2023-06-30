import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as employers from "./schema/employers";
import * as jobs from "./schema/jobs";
import * as skills from "./schema/skills";

const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PW;
const host = "localhost";
const port = 5432;
const database = "octocoach";

export const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

const client = postgres(connectionString);
export const db = drizzle(client, {
  schema: { ...employers, ...jobs, ...skills },
});

export const end = async () => {
  await client.end();
};
