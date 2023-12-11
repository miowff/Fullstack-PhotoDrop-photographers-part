import { S3Event } from "aws-lambda";
import { CreatePhotoRequest } from "src/models/photo";
import { albumsService } from "src/services/albumsService";
import { photosService } from "src/services/photosService";
import responseCreator from "src/services/utils/responseCreator";
import { s3Service } from "src/services/utils/s3Service";

export const handler = async (event: S3Event) => {
  try {
    const { Records } = event;
    const key = decodeURI(Records[0].s3.object.key).replace(/\+/g, " ");
    const splittedKey = key.split("/");
    const albumTitle = decodeURI(splittedKey[1]);
    const { id, title } = await albumsService.getByTitle(albumTitle);
    const photoKey = splittedKey[2];
    const createPhotoRequest: CreatePhotoRequest = {
      albumId: id,
      albumTitle: title,
      photoName: photoKey,
    };
    await photosService.addPhoto(createPhotoRequest);
    const photoBuffer = await s3Service.getImageBuffer(key);
    await photosService.addWatermarkAndCreatePreview(
      photoBuffer,
      photoKey,
      title
    );

    return;
  } catch (err) {
    return responseCreator.error(err);
  }
};
