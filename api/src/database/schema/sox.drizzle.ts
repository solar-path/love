import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./auth.drizzle";
import { companyTable, structureTable } from "./business.drizzle";
import { sql } from "drizzle-orm";
import { riskTable } from "./erm.drizzle";

export const processTable = sqliteTable("sox_process", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  author: text("author").references(() => userTable.id),
  processOwner: text("process_owner").references(() => structureTable.id),
  company: text("company").references(() => companyTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  parent: text("parent").references(() => processTable.id),
});

export const controlTable = sqliteTable("sox_control", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  riskOwner: text("risk_owner").references(() => structureTable.id),
  company: text("company").references(() => companyTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const soxRcmTable = sqliteTable("sox_rcm", {
  id: text("id").primaryKey(),
  process: text("process").references(() => processTable.id),
  risk: text("risk").references(() => riskTable.id),
  control: text("control").references(() => controlTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
