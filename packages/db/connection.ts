import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import { connectionString } from "./config/connection";
import { mkOrgSchema } from "./schemas/org/schema";
import { publicSchema } from "./schemas/public/schema";

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

export const db = drizzle(client, { schema: publicSchema });

export type Database = typeof db;

export const orgDb = (orgSlug: string) =>
  drizzle(client, { schema: mkOrgSchema(orgSlug) });

export type OrgDatabase = ReturnType<typeof orgDb>;

export const end = async () => {
  await client.end();
};
