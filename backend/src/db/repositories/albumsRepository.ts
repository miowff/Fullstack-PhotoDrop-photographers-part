import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";
import { IAlbumsRepository } from "../IRepositories/IAlbumsRepository";
import { Album, InsertAlbum, albums } from "../schema/album";
import { eq } from "drizzle-orm";

class AlbumsRepository implements IAlbumsRepository<InsertAlbum, Album> {
  constructor(private readonly db: MySql2Database) {}
  getByTitle = async (title: string): Promise<Album> => {
    const album = await this.db
      .select()
      .from(albums)
      .where(eq(albums.title, title));
    return album[0];
  };
  getAllPhotographerAlbums = async (
    photographerId: string
  ): Promise<Album[]> => {
    return await this.db
      .select()
      .from(albums)
      .where(eq(albums.photographerId, photographerId));
  };
  addNew = async (album: InsertAlbum) => {
    await this.db.insert(albums).values(album);
  };
  getById = async (id: string): Promise<Album> => {
    const album = await this.db.select().from(albums).where(eq(albums.id, id));
    return album[0];
  };
}
export const albumsRepository = new AlbumsRepository(db);
