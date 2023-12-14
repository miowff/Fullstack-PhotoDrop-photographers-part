import { AttachUsersToPhoto } from "src/models/attachUsersModel";
import { CreatePhotoRequest } from "src/models/photo";

export interface IPhotosService {
  createAttachRequests(attachRequest: AttachUsersToPhoto): Promise<void>;
  attachUsersToPhoto(photoKey: string, photoId: string): Promise<void>;
  addPhoto(photo: CreatePhotoRequest): Promise<void>;
  addWatermarkAndCreatePreview(
    photoBuffer: Buffer,
    photoName: string,
    albumTitle: string
  ): Promise<void>;
}
