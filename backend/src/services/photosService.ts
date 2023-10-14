import { randomUUID } from "crypto";
import { IPhotosService } from "./IServices/IPhotosService";
import { CreatePhotoRequest } from "src/models/photo";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { InsertPhoto, Photo } from "src/db/schema/photo";
import { photosRepository } from "src/db/repositories/photosRepository";
import { s3Service } from "./utils/s3Service";
import getEnv from "./utils/getEnv";
import photoEditor from "./utils/photoEditor";
import { FoldersNames } from "src/enums/foldersNames";
import { AttachUsersToPhoto } from "src/models/attachUsersModel";
import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { SelectUser } from "src/db/schema/users";
import { usersRepository } from "src/db/repositories/usersRepository";

class PhotosService implements IPhotosService {
  constructor(
    private readonly photosRepository: IPhotosRepository<InsertPhoto, Photo>,
    private readonly usersRepository: IUsersRepository<SelectUser>
  ) {}
  addWatermarkAndCreateThumbnails = async (
    photoKey: string,
    photoName: string,
    albumTitle: string
  ): Promise<void> => {
    const photoBuffer = await s3Service.getImageBuffer(photoKey);
    const watermarkBuffer = await s3Service.getImageBuffer(
      getEnv("WATERMARK_KEY") as string
    );
    await photoEditor.setWatermark(watermarkBuffer);
    const thumbnailPromise = photoEditor.createThumbnail(photoBuffer);
    const thumbnailKey = `${FoldersNames.THUMBNAILS}/${albumTitle}/${photoName}`;
    const watermarkedPhotoPromise = photoEditor.addWatermark(photoBuffer);
    const watermarkedPhotoKey = `${FoldersNames.WATERMARKED_PHOTOS}/${albumTitle}/${photoName}`;
    const watermarkedThumbnailPromise =
      photoEditor.createWatermarkedThumbnail(photoBuffer);
    const watermarkedThumbnailKey = `${FoldersNames.WATERMARKED_THUMBNAILS}/${albumTitle}/${photoName}`;
    const promisesArray = new Array(
      thumbnailPromise,
      watermarkedPhotoPromise,
      watermarkedThumbnailPromise
    );
    const keys = new Array(
      thumbnailKey,
      watermarkedPhotoKey,
      watermarkedThumbnailKey
    );
    const promisesResult = await Promise.all(promisesArray);
    await s3Service.uploadEditedPhotos(promisesResult, keys);
    return;
  };
  attachUsersToPhoto = async (
    attachRequest: AttachUsersToPhoto
  ): Promise<void> => {
    const { albumId, userPhoto } = attachRequest;
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
        }
      }
    }
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
