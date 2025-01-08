import { sql } from "drizzle-orm";
import { userTable } from "./auth.drizzle";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { companyTable, structureTable } from "./business.drizzle";

export const taskTable = sqliteTable("task", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  author: text("author").references(() => userTable.id),
  responsible: text("responsible").references(() => structureTable.id),
  startDate: text("startDate"),
  dueDate: text("dueDate"),
  completedDate: text("completedDate"),
  status: text("status"),
  company: text("company").references(() => companyTable.id),
});
