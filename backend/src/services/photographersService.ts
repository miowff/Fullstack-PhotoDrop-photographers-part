import { IPhotographersRepository } from "src/db/IRepositories/IPhotographersRepository";
import { photographersRepository } from "src/db/repositories/photographersRepository";
import { Photographer } from "src/db/entities/photographer";
import { IPhotographersService } from "./IServices/IPhotographersService";
import { TokensResponse } from "src/models/tokensResponse";
import { ApiError } from "src/errors/apiError";
import { validatePassword } from "./utils/passwordValidator";
import { jwtTokenService } from "./utils/jwtTokensService";

class PhotographersService implements IPhotographersService {
  constructor(
    readonly photographersRepository: IPhotographersRepository<Photographer>
  ) {}
  signIn = async (password: string, login: string): Promise<TokensResponse> => {
    const photographer = await this.photographersRepository.getByLogin(login);
    if (!photographer) {
      throw ApiError.NotFound(login);
    }
    const { passwordHash, id: photographerId } = photographer;
    const isPasswordCorrect = validatePassword(password, passwordHash);
    if (!isPasswordCorrect) {
      throw ApiError.WrongPassword();
    }
    const token = jwtTokenService.generateAccessToken(photographerId);
    return token;
  };
}
export const photographersService = new PhotographersService(
  photographersRepository
);
