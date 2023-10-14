import { photos } from "./photo";
import { albums } from "./album";
import { users } from "./users";
import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userPhotos = mysqlTable("UserPhotos", {
  UserId: varchar("UserId", { length: 70 })
    .references(() => users.id)
    .notNull(),
  photoId: varchar("PhotoId", { length: 80 })
    .references(() => photos.id)
    .notNull(),
  albumId: varchar("AlbumId", { length: 70 })
    .references(() => albums.id)
    .notNull(),
  isActivated: boolean("IsActivated").notNull().default(false),
});
export type UserPhoto = typeof userPhotos.$inferInsert;
