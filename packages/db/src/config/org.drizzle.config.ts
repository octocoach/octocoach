import { Config } from "drizzle-kit";

export default {
  schemaFilter: "org_{slug}",
} satisfies Config;
