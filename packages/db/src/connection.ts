import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import { connectionString } from "./config/connection";
import { makeOrgSchema } from "./org";
import defaultSchema from "./schema";

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

export type Database = typeof db;

export const end = async () => {
  await client.end();
};
