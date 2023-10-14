import AWS from "aws-sdk";
import { FoldersNames } from "src/enums/foldersNames";
import { ApiError } from "src/errors/apiError";
import { EditedPhotoDto } from "src/models/photo";
import { PhotoData } from "src/models/requestUrlsForPhotos";

class S3Service {
  private readonly bucketName = "photo-drop-images";
  private readonly s3 = new AWS.S3({ region: "us-east-1" });
  createPreSignedPostUrls = async (
    photosData: PhotoData[],
    albumName: string
  ) => {
    const s3BucketName = this.bucketName;
    const urlsPromises: Promise<AWS.S3.PresignedPost>[] = [];
    for (let i = 0; i < photosData.length; i++) {
      const { name, type } = photosData[i];
      const params = {
        Bucket: s3BucketName,
        Conditions: [["content-length-range", 0, 10000000]],
        Fields: {
          Key: `${FoldersNames.ORIGINAL_PHOTOS}/${albumName}/` + name,
          ContentType: type,
        },
      };
      urlsPromises.push(
        this.s3.createPresignedPost(
          params
        ) as unknown as Promise<AWS.S3.PresignedPost>
      );
    }
    return await Promise.all(urlsPromises);
  };
  getImageBuffer = async (imageKey: string) => {
    const image = await this.s3
      .getObject({ Bucket: this.bucketName, Key: imageKey })
      .promise();
    const { Body: result } = image;
    if (!result) {
      throw ApiError.NotFound("Photo");
    }
    return result as Buffer;
  };
  uploadEditedPhotos = async (photos: EditedPhotoDto[], keys: string[]) => {
    let i = 0;
    const promises = photos.map(async (file) => {
      const { buffer, mime } = file;
      const key = keys[i];
      i++;
      await this.s3
        .upload({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mime,
        })
        .promise();
    });
    await Promise.all(promises);
  };
}

export const s3Service = new S3Service();
