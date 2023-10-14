import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { albums } from "./album";

export const photos = mysqlTable("Photos", {
  id: varchar("Id", { length: 80 }).primaryKey().notNull(),
  albumId: varchar("AlbumId", { length: 70 })
    .references(() => albums.id)
    .notNull(),
  albumTitle: varchar("AlbumTitle", { length: 256 }).notNull(),
  photoName: varchar("PhotoName", {
    length: 256,
  }).notNull(),
});

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = typeof photos.$inferInsert;
