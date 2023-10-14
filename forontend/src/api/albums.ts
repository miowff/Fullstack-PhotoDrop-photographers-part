import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { BASE_URL } from "@/enums/baseUrl";
import { AlbumModel, CreateAlbumModel } from "@/models/album";
import axios from "axios";

export const getAlbums = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await axios.get(BASE_URL + "/albums", {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data;
};
export const addAlbum = async (
  album: CreateAlbumModel
): Promise<AlbumModel> => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await axios.post(BASE_URL + "/albums", album, {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data as AlbumModel;
};
