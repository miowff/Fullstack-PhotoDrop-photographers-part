import { UserPhoto } from "../entities/userPhotos";

export interface IPhotosRepository<TInsert, TSelect> {
  addNew(album: TInsert): Promise<void>;
  getAllAlbumPhotos(albumId: string): Promise<TSelect[]>;
  attachToUser(userPhoto: UserPhoto): Promise<void>;
}
