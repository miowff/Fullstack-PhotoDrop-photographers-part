import { TokensResponse } from "src/models/tokensResponse";

export interface IPhotographersService {
  signIn(password: string, login: string): Promise<TokensResponse>;
}
