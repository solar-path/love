import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  fullname: text("fullname"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  emailVerified: integer("verified", { mode: "boolean" }).default(false),
  avatar: text("avatar"),
  verificationToken: text("verificationToken").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
