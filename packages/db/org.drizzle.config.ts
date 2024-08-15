import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas/org/migration-schema.ts",
  out: "./migrations-org",
});
