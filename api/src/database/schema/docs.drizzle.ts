import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./auth.drizzle";
import { sql } from "drizzle-orm";

export const postTable = sqliteTable("post", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  coverImage: text("coverImage"),
  author: text("author").references(() => userTable.id),
  status: text("status").notNull().default("draft"),
  parent: text("parent").references(() => postTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
