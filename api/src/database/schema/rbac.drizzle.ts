import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./auth.drizzle";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const roleTable = sqliteTable("role", {
  id: text("id").primaryKey(),
  title: text("title").notNull().unique(),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const permissionTable = sqliteTable("permission", {
  id: text("id").primaryKey(),
  title: text("title").notNull().unique(),
  description: text("description").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const rolePermissionTable = sqliteTable("role_permission", {
  id: text("id").primaryKey(),
  roleId: text("role_id").references(() => roleTable.id),
  permissionId: text("permission_id").references(() => permissionTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userRoleTable = sqliteTable("user_role", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userTable.id),
  roleId: text("role_id").references(() => roleTable.id),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const roleRelations = relations(roleTable, ({ many }) => ({
  permissions: many(rolePermissionTable),
  users: many(userRoleTable),
}));

export const permissionRelations = relations(permissionTable, ({ many }) => ({
  roles: many(rolePermissionTable),
}));

export const rolePermissionRelations = relations(
  rolePermissionTable,
  ({ one }) => ({
    role: one(roleTable, {
      fields: [rolePermissionTable.roleId],
      references: [roleTable.id],
    }),
    permission: one(permissionTable, {
      fields: [rolePermissionTable.permissionId],
      references: [permissionTable.id],
    }),
  })
);

export const userRoleRelations = relations(userRoleTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userRoleTable.userId],
    references: [userTable.id],
  }),
  role: one(roleTable, {
    fields: [userRoleTable.roleId],
    references: [roleTable.id],
  }),
}));
