import type { Config } from "drizzle-kit";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(__dirname, ".env.local") });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set. Make sure .env.local exists and contains POSTGRES_URL");
}

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;
