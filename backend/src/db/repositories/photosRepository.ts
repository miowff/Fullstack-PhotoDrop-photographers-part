import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";

import { IPhotosRepository } from "../IRepositories/IPhotosRepository";
import { InsertPhoto, Photo, photos } from "../entities/photo";
import { eq } from "drizzle-orm";
import { UserPhoto, userPhotos } from "../entities/userPhotos";

class PhotosRepository implements IPhotosRepository<InsertPhoto, Photo> {
  constructor(private readonly db: MySql2Database) {}
  attachToUser = async (userPhoto: UserPhoto): Promise<void> => {
    await this.db.insert(userPhotos).values(userPhoto);
  };
  getAllAlbumPhotos = async (albumId: string): Promise<Photo[]> => {
    const albumPhotos = await this.db
      .select()
      .from(photos)
      .where(eq(photos.albumId, albumId));
    return albumPhotos;
  };
  addNew = async (photo: InsertPhoto): Promise<void> => {
    const existsPhoto = await this.db
      .select()
      .from(photos)
      .where(eq(photos.photoName, photo.photoName));
    if (existsPhoto) {
      await this.db.update(photos).set(photo);
    } else {
      await this.db.insert(photos).values(photo);
    }
  };
}
export const photosRepository = new PhotosRepository(db);
