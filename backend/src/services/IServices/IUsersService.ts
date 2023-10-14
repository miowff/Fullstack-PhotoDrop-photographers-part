export interface IUsersService {
  getAllAvailableNumbers(): Promise<string[]>;
}
