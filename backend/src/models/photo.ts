export interface CreatePhotoRequest {
  albumId: string;
  albumTitle: string;
  photoName: string;
}
export interface EditedPhotoDto {
  buffer: Buffer;
  mime: string;
}
