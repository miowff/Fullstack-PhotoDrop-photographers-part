export interface AttachUsersToPhoto {
  albumId: string;
  userPhoto: Map<string, string[]>;
}
export interface AttachUsersToPhotoRequest {
  albumId: string;
  userPhotoMap: string;
}
