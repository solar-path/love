import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./auth.drizzle";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const companyTable = sqliteTable(
  "business_company",
  {
    id: text("id").primaryKey(),
    description: text("description"),
    title: text("title").notNull(),
    logo: text("logo"),
    companySlug: text("companySlug").notNull().unique(),
    industry: text("industry").notNull(),
    residence: text("residence").notNull(),
    BIN: text("bin").notNull(),
    author: text("author")
      .notNull()
      .references(() => userTable.id),
    createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    titleBinResidenceIdx: index("title_bin_residence_idx").on(
      table.title,
      table.BIN,
      table.residence
    ),
  })
);

export const positionTable = sqliteTable("business_position", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author")
    .notNull()
    .references(() => userTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const departmentTable = sqliteTable("business_department", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author")
    .notNull()
    .references(() => userTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const structureTable = sqliteTable("business_structure", {
  id: text("id").primaryKey(),
  position: text("position").references(() => positionTable.id),
  department: text("department").references(() => departmentTable.id),
  company: text("company")
    .notNull()
    .references(() => companyTable.id),
  employee: text("employee").references(() => userTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Company relations
export const companyRelations = relations(companyTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [companyTable.author],
    references: [userTable.id],
  }),
  structure: many(structureTable),
}));

// Structure relations
export const structureRelations = relations(structureTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [structureTable.company],
    references: [companyTable.id],
  }),
  employee: one(userTable, {
    fields: [structureTable.employee],
    references: [userTable.id],
  }),
  position: one(positionTable, {
    fields: [structureTable.position],
    references: [positionTable.id],
  }),
  department: one(departmentTable, {
    fields: [structureTable.department],
    references: [departmentTable.id],
  }),
}));

// Position relations
export const positionRelations = relations(positionTable, ({ many }) => ({
  structures: many(structureTable),
}));

// Department relations
export const departmentRelations = relations(departmentTable, ({ many }) => ({
  structures: many(structureTable),
}));
