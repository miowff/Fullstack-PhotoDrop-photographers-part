export interface AttachUsersToPhoto {
  albumId: string;
  userPhotoMap: string;
}

export interface PhotoData {
  name: string;
  type: string;
}

export interface RequestLinks {
  photosData: PhotoData[];
  albumId: string;
}
