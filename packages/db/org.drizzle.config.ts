import type { Config } from "drizzle-kit";

export default {
  schema: "./schemas/org/migration-schema.ts",
  out: "./drizzle-org",
} satisfies Config;
