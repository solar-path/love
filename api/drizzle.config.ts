import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/database/migrations",
  schema: "./src/database/schema/*.drizzle.ts",
  dialect: "turso",
  dbCredentials: {
    url: Bun.env["TURSO_DATABASE_URL"]!,
    authToken: Bun.env["TURSO_AUTH_TOKEN"]!,
  },
});
