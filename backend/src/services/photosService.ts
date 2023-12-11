import { randomUUID } from "crypto";
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
import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { SelectUser } from "src/db/entities/users";
import { usersRepository } from "src/db/repositories/usersRepository";
import { snsService } from "./utils/snsService";

class PhotosService implements IPhotosService {
  constructor(
    private readonly photosRepository: IPhotosRepository<InsertPhoto, Photo>,
    private readonly usersRepository: IUsersRepository<SelectUser>
  ) {}
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
  attachUsersToPhoto = async (
    attachRequest: AttachUsersToPhoto
  ): Promise<void> => {
    const { albumId, userPhoto } = attachRequest;
    const phoneNumbersSet = new Set<string>();
    const albumPhotos = await this.photosRepository.getAllAlbumPhotos(albumId);
    for (let i = 0; i < albumPhotos.length; i++) {
      const { id: photoId, photoName } = albumPhotos[i];
      const phoneNumbers = userPhoto.get(photoName);
      if (phoneNumbers) {
        for (let j = 0; j < phoneNumbers?.length; j++) {
          const { id: userId } =
            await this.usersRepository.getUserByPhoneNumber(phoneNumbers[j]);
          await this.photosRepository.attachToUser({
            UserId: userId,
            photoId: photoId,
            albumId: albumId,
            isActivated: false,
          });
          phoneNumbersSet.add(phoneNumbers[j]);
        }
      }
    }
    await snsService.addPhotosUploadedEvent(Array.from(phoneNumbersSet));
  };
  addPhoto = async (photo: CreatePhotoRequest): Promise<void> => {
    const photoId = randomUUID();
    const { albumId, albumTitle, photoName } = photo;
    await this.photosRepository.addNew({
      id: photoId,
      albumId,
      albumTitle,
      photoName,
    });
  };
}
export const photosService = new PhotosService(
  photosRepository,
  usersRepository
);
