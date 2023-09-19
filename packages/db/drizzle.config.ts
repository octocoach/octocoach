import type { Config } from "drizzle-kit";

export default {
  schema: "./schemas/public/schema.ts",
  out: "./drizzle-public",
} satisfies Config;
