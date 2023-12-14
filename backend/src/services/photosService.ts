import { IPhotosService } from "./IServices/IPhotosService";
import { CreatePhotoRequest } from "src/models/photo";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { InsertPhoto, Photo } from "src/db/entities/photo";
import { photosRepository } from "src/db/repositories/photosRepository";
import { s3Service } from "./utils/s3Service";
import getEnv from "./utils/getEnv";
import photoEditor from "./utils/photoEditor";
import { FoldersNames } from "src/enums/foldersNames";
import { AttachUsersToPhoto } from "src/models/attachUsersModel";
import { IAttachRequestsRepository } from "src/db/IRepositories/IAttachRequestsRepository";
import {
  InsertRequest,
  SelectRequest,
} from "src/db/entities/attachPhotoRequest";
import { attachPhotosRequestsRepository } from "src/db/repositories/attachRequestsRepository";
import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { SelectUser } from "src/db/entities/users";
import { usersRepository } from "src/db/repositories/usersRepository";
import { snsService } from "./utils/snsService";

class PhotosService implements IPhotosService {
  constructor(
    private readonly photosRepository: IPhotosRepository<InsertPhoto, Photo>,
    private readonly usersRepository: IUsersRepository<SelectUser>,
    private readonly attachPhotosRequestsRepository: IAttachRequestsRepository<
      InsertRequest,
      SelectRequest
    >
  ) {}
  attachUsersToPhoto = async (
    photoKey: string,
    photoId: string
  ): Promise<void> => {
    const { albumId, phoneNumbers: stringPhoneNumbers } =
      await this.attachPhotosRequestsRepository.get(photoKey);
    const phoneNumbers = JSON.parse(stringPhoneNumbers) as string[];
    for (const number of phoneNumbers) {
      const { id: UserId } = await this.usersRepository.getUserByPhoneNumber(
        number
      );
      await this.photosRepository.attachToUser({
        UserId,
        photoId: photoId,
        albumId: albumId,
        isActivated: false,
      });
      await this.attachPhotosRequestsRepository.delete(photoKey);
    }
  };
  addWatermarkAndCreatePreview = async (
    photoBuffer: Buffer,
    photoName: string,
    albumTitle: string
  ) => {
    const watermarkBuffer = await s3Service.getImageBuffer(
      getEnv("WATERMARK_KEY") as string
    );
    await photoEditor.setWatermark(watermarkBuffer);
    const watermarkedPhotoPromise = photoEditor.addWatermark(photoBuffer);
    const watermarkedPhotoKey = `${FoldersNames.WATERMARKED_PHOTOS}/${albumTitle}/${photoName}`;
    const previewKey = `${FoldersNames.PREVIEWS}/${albumTitle}/${photoName}`;
    const preview = photoEditor.createPreview(photoBuffer);
    const promisesArray = new Array(watermarkedPhotoPromise, preview);
    const keys = new Array(watermarkedPhotoKey, previewKey);
    const promisesResult = await Promise.all(promisesArray);
    await s3Service.uploadEditedPhotos(promisesResult, keys);
  };
  createAttachRequests = async (
    attachRequest: AttachUsersToPhoto
  ): Promise<void> => {
    const { albumId, userPhoto } = attachRequest;
    const phoneNumbersSet = new Set<string>();
    for (const [photoKey, phoneNumbers] of userPhoto) {
      const attachPhotoRequest = {
        photoKey,
        phoneNumbers: JSON.stringify(phoneNumbers),
        albumId,
      };
      await this.attachPhotosRequestsRepository.add(attachPhotoRequest);
      for (const phoneNumber of phoneNumbers) {
        phoneNumbersSet.add(phoneNumber);
      }
    }
    await snsService.addPhotosUploadedEvent(Array.from(phoneNumbersSet));
  };
  addPhoto = async (photo: CreatePhotoRequest): Promise<void> => {
    const { albumId, albumTitle, photoName, photoId: id } = photo;
    await this.photosRepository.addNew({
      id,
      albumId,
      albumTitle,
      photoName,
    });
  };
}
export const photosService = new PhotosService(
  photosRepository,
  usersRepository,
  attachPhotosRequestsRepository
);
