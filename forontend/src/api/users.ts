import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { BASE_URL } from "@/enums/baseUrl";
import axios from "axios";

export const getAvailableNumbers = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await axios.get(BASE_URL + "/available-numbers", {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data;
};
