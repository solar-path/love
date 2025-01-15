import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { companyTable, structureTable } from "./business.drizzle";
import { userTable } from "./auth.drizzle";
import { taskTable } from "./task.drizzle";
import type { RiskOutcome } from "@/routes/erm/erm.zod";
import type { Factor } from "@/routes/erm/erm.zod";
import { relations } from "drizzle-orm";

export const riskTable = sqliteTable("erm_risk", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").references(() => companyTable.id),
  description: text("description").notNull(),
  factor: text("factor", { mode: "json" }).$type<Factor>(),
  outcome: text("outcome", { mode: "json" }).$type<RiskOutcome>(),
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

export const riskTableRelations = relations(riskTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [riskTable.company],
    references: [companyTable.id],
  }),
  riskOwner: one(structureTable, {
    fields: [riskTable.riskOwner],
    references: [structureTable.id],
  }),
  author: one(userTable, {
    fields: [riskTable.author],
    references: [userTable.id],
  }),
  actions: one(taskTable, {
    fields: [riskTable.actions],
    references: [taskTable.id],
  }),
}));

export const ermScaleTableRelations = relations(ermScaleTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [ermScaleTable.company],
    references: [companyTable.id],
  }),
}));

export const ermScoreTableRelations = relations(ermScoreTable, ({ one }) => ({
  risk: one(riskTable, {
    fields: [ermScoreTable.risk],
    references: [riskTable.id],
  }),
  company: one(companyTable, {
    fields: [ermScoreTable.company],
    references: [companyTable.id],
  }),
  scale: one(ermScaleTable, {
    fields: [ermScoreTable.scale],
    references: [ermScaleTable.id],
  }),
}));
