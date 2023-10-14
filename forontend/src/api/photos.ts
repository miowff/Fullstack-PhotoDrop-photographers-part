import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { BASE_URL } from "@/enums/baseUrl";
import { AttachUsersToPhoto, PhotoData } from "@/models/photo";
import { PresignedUrl } from "@/models/url";
import axios from "axios";

export const requestUploadUrls = async (
  photosData: PhotoData[],
  albumId: string
) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await axios.post(
    BASE_URL + "/request-upload-urls",
    { photosData, albumId },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
  return response.data as PresignedUrl[];
};
export const attachUsersToPhoto = async (
  attachUsersToPhoto: AttachUsersToPhoto
) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  await axios.post(BASE_URL + "/attach-users-to-photo", attachUsersToPhoto, {
    headers: {
      Authorization: authToken,
    },
  });
};
