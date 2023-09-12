import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import defaultSchema from "./schema";
import { makeOrgSchema } from "./schema/organization/members";

const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PW;
const host = "localhost";
const port = 5432;
const database = "octocoach";

export const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

let client: Sql<{}>;

if (process.env.NODE_ENV === "production") {
  client = postgres(connectionString);
} else {
  let globalClient = global as typeof globalThis & {
    client: Sql<{}>;
  };

  if (!globalClient.client) {
    globalClient.client = postgres(connectionString);
  }

  client = globalClient.client;
}

export const orgDb = (orgSlug: string) =>
  drizzle(client, {
    schema: { ...defaultSchema, ...makeOrgSchema(orgSlug) },
  });

export const db = drizzle(client, { schema: defaultSchema });

export const end = async () => {
  await client.end();
};
