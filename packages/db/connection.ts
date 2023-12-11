import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { WebSocket } from "undici";
import { mkOrgSchema } from "./schemas/org/schema";
import { publicSchema } from "./schemas/public/schema";
import ws from "ws";

const connectionString = process.env.POSTGRES_URL;

console.log(connectionString);

let pool: Pool;

if (!process.env.VERCEL_ENV) {
  neonConfig.webSocketConstructor = ws;
  neonConfig.wsProxy = (host) => {
    console.log(`Proxy for ${host}`);
    return `${host}:5433/v1`;
  };
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;

  let globalClient = global as typeof globalThis & {
    pool: Pool;
  };

  if (!globalClient.pool) {
    console.log("Creating global pool");
    globalClient.pool = new Pool({ connectionString });
  }

  pool = globalClient.pool;
} else {
  pool = new Pool({ connectionString });
}

pool.on("error", (err) => {
  console.error(err);
});

export const db = drizzle(pool, { schema: publicSchema });

export type Database = typeof db;

export const orgDb = (orgSlug: string) =>
  drizzle(pool, { schema: mkOrgSchema(orgSlug) });

export type OrgDatabase = ReturnType<typeof orgDb>;

export const end = async () => {
  await pool.end();
};
