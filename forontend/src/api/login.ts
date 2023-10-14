import { BASE_URL } from "@/enums/baseUrl";
import { SignIn } from "@/enums/urlPaths";
import axios from "axios";

export const signIn = async (password: string, login: string) => {
  const { data } = await axios.post(`${BASE_URL}/${SignIn}`, {
    password,
    login,
  });
  return data.accessToken;
};
