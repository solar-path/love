import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { companyTable, structureTable } from "./business.drizzle";
import { userTable } from "./auth.drizzle";
import { taskTable } from "./task.drizzle";

export const factorTable = sqliteTable("erm_factor", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const consequenceTable = sqliteTable("erm_consequence", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const riskTable = sqliteTable("erm_risk", {
  id: text("id").primaryKey(),
  company: text("company").references(() => companyTable.id),
  description: text("description").notNull(),
  factor: text("factor").references(() => factorTable.id),
  consequence: text("consequence").references(() => consequenceTable.id),
  riskOwner: text("riskOwner").references(() => structureTable.id),
  author: text("author").references(() => userTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  actions: text("actions").references(() => taskTable.id),
});

export const ermScaleTable = sqliteTable("erm_scale", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  impact: integer("impact").notNull(),
  likelihood: integer("likelihood").notNull(),
  score: integer("score").notNull(),
  company: text("company").references(() => companyTable.id),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const ermScoreTable = sqliteTable("erm_score", {
  id: text("id").primaryKey(),
  risk: text("risk").references(() => riskTable.id),
  company: text("company").references(() => companyTable.id),
  impact: integer("impact").notNull(),
  likelihood: integer("likelihood").notNull(),
  score: integer("score").notNull(),
  scale: text("scale").references(() => ermScaleTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
