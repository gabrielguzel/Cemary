import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

// For serverless environments, use connection pooling
// Supabase provides a connection string that works with postgres.js
const client = postgres(process.env.POSTGRES_URL, {
  max: 1, // Limit connections for serverless
  ssl: { rejectUnauthorized: false }, // Required for Supabase SSL
});

export const db = drizzle(client, { schema });
