import { Album, AlbumPreview, CreateAlbumModel } from "src/db/schema/album";

export interface IAlbumsService {
  getAllPhotographerAlbums(photographerId: string): Promise<AlbumPreview[]>;
  createNewAlbum(
    albumModel: CreateAlbumModel,
    photographerId: string
  ): Promise<AlbumPreview>;
  getById(albumId: string): Promise<Album>;
  getByTitle(title:string):Promise<Album>
}
