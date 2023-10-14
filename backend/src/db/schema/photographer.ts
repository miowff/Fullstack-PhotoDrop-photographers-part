import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const photographers = mysqlTable("Photographers", {
  id: varchar("Id", { length: 70 }).primaryKey().notNull(),
  email: varchar("Email", { length: 100 }),
  fullName: varchar("FullName", { length: 256 }),
  login: varchar("Login", { length: 256 }).notNull(),
  passwordHash: varchar("PasswordHash", { length: 256 }).notNull(),
});
export type Photographer = typeof photographers.$inferSelect;
