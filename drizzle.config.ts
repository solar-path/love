import { defineConfig, type Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "turso",
  schema: "./app/drizzle/schema/*.drizzle.ts",
  out: "./app/drizzle/migrations",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
}) satisfies Config;
