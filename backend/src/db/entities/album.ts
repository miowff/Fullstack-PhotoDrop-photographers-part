import { albums as AlbumsSchema } from "../photodrop-database-schema/schema/album";
export const albums = AlbumsSchema;
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
