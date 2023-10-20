import { IAlbumsService } from "./IServices/IAlbumsService";
import {
  Album,
  AlbumPreview,
  CreateAlbumModel,
  InsertAlbum,
} from "src/db/entities/album";
import { IAlbumsRepository } from "src/db/IRepositories/IAlbumsRepository";
import { albumsRepository } from "src/db/repositories/albumsRepository";
import { randomUUID } from "crypto";
import { ApiError } from "src/errors/apiError";

class AlbumsService implements IAlbumsService {
  constructor(
    private readonly albumsRepository: IAlbumsRepository<InsertAlbum, Album>
  ) {}
  getByTitle = async (title: string): Promise<Album> => {
    const album = await this.albumsRepository.getByTitle(title);
    if (!album) {
      throw ApiError.NotFound(`Album with title ${title}`);
    }
    return album;
  };
  getAllPhotographerAlbums = async (
    photographerId: string
  ): Promise<AlbumPreview[]> => {
    const albums = await this.albumsRepository.getAllPhotographerAlbums(
      photographerId
    );
    const result: AlbumPreview[] = albums.map((album) => {
      const { id } = album;
      return Object.assign({}, album, {
        id: id,
        createdDate: undefined,
        dataPicker: undefined,
        photographerId: undefined,
        price: undefined,
      });
    });
    return result;
  };
  createNewAlbum = async (
    albumModel: CreateAlbumModel,
    photographerId: string
  ): Promise<Album> => {
    const { title, location, dataPicker } = albumModel;
    const albumId = randomUUID();
    const newAlbum: InsertAlbum = {
      id: albumId,
      title: title,
      location: location,
      dataPicker: dataPicker,
      createdDate: new Date(),
      photographerId: photographerId,
    };
    await this.albumsRepository.addNew(newAlbum);
    return Object.assign({}, newAlbum, {
      id: albumId,
      createdDate: undefined,
      dataPicker: undefined,
      photographerId: undefined,
      price: undefined,
    });
  };
  getById = async (albumId: string): Promise<Album> => {
    const album = await this.albumsRepository.getById(albumId);
    return album;
  };
}
export const albumsService = new AlbumsService(albumsRepository);
