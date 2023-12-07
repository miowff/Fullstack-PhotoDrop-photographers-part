import { AttachUsersToPhoto } from "src/models/attachUsersModel";
import { CreatePhotoRequest } from "src/models/photo";

export interface IPhotosService {
  attachUsersToPhoto(attachRequest: AttachUsersToPhoto): Promise<void>;
  addPhoto(photo: CreatePhotoRequest): Promise<void>;
  addWatermarkAndCreatePreview(
    photoBuffer: Buffer,
    photoName: string,
    albumTitle: string
  ): Promise<void>;
}
