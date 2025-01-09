import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./auth.drizzle";
import { sql } from "drizzle-orm";
import { companyTable } from "./business.drizzle";

export const inquiryTable = sqliteTable("crm_inquiry", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  status: text("status").notNull().default("open"),
  author: text("author").references(() => userTable.id),
  reply: text("reply"),
});

export const contactTable = sqliteTable("crm_contact", {
  id: text("id").primaryKey(),
  company: text("company").references(() => companyTable.id),
  user: text("user").references(() => userTable.id),
  addressLine: text("addressLine").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postCode: text("postCode").notNull(),
  country: text("country"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
