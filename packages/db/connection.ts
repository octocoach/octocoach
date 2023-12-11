import "./polyfills/crypto";
import { neonConfig } from "@neondatabase/serverless";
import { VercelPool, createPool, sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import ws from "ws";
import { mkOrgSchema } from "./schemas/org/schema";
import { publicSchema } from "./schemas/public/schema";

const connectionString = process.env.POSTGRES_URL;

let client: VercelPool;

console.log(connectionString);

if (!process.env.VERCEL_ENV) {
  neonConfig.webSocketConstructor = ws;
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;

  let globalClient = global as typeof globalThis & {
    client: VercelPool;
  };

  if (!globalClient.client) {
    globalClient.client = createPool({ connectionString });
  }

  client = globalClient.client;
} else {
  client = sql;
}

client.on("error", (err) => {
  console.error(err);
});

export const db = drizzle(client, { schema: publicSchema });

export type Database = typeof db;

export const orgDb = (orgSlug: string) =>
  drizzle(client, { schema: mkOrgSchema(orgSlug) });

export type OrgDatabase = ReturnType<typeof orgDb>;

export const end = async () => {
  await client.end();
};
