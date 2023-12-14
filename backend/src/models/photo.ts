export interface CreatePhotoRequest {
  photoId: string;
  albumId: string;
  albumTitle: string;
  photoName: string;
}
export interface EditedPhotoDto {
  buffer: Buffer;
  mime: string;
}
