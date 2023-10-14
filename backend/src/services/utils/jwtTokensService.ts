import * as jwt from "jsonwebtoken";
import { TokensResponse } from "src/models/tokensResponse";
import getEnv from "./getEnv";

class JwtTokensService {
  generateAccessToken = (photographerId: string): TokensResponse => {
    const accessToken = jwt.sign(
      { photographerId: photographerId },
      getEnv("ACCESS_TOKEN_SECRET") as string,
      { expiresIn: "1d" }
    );
    return { accessToken };
  };
  validateAccessToken = async (token: string) => {
    return jwt.verify(token, getEnv("ACCESS_TOKEN_SECRET") as string);
  };
}

export const jwtTokenService = new JwtTokensService();
