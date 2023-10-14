import { date, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const albums = mysqlTable("Albums", {
  id: varchar("Id", { length: 100 }).primaryKey().notNull(),
  title: varchar("Title", { length: 256 }).notNull(),
  location: varchar("Location", { length: 100 }).notNull(),
  dataPicker: varchar("Datapicker", { length: 100 }).notNull(),
  createdDate: date("CreatedDate").notNull(),
  photographerId: varchar("PhotographerId", { length: 100 }).notNull(),
  price: int("Price").notNull().default(5),
});
export interface CreateAlbumModel {
  title: string;
  location: string;
  dataPicker: string;
}
export interface AlbumPreview {
  id: string;
  title: string;
  location: string;
}
export type InsertAlbum = typeof albums.$inferInsert;
export type Album = typeof albums.$inferSelect;
