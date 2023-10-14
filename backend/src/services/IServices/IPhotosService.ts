import { AttachUsersToPhoto } from "src/models/attachUsersModel";
import { CreatePhotoRequest } from "src/models/photo";

export interface IPhotosService {
  attachUsersToPhoto(attachRequest: AttachUsersToPhoto): Promise<void>;
  addPhoto(photo: CreatePhotoRequest): Promise<void>;
  addWatermarkAndCreateThumbnails(
    photoKey: string,
    photoName: string,
    albumTitle: string
  ): Promise<void>;
}
