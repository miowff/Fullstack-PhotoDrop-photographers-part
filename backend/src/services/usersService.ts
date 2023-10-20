import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { SelectUser } from "src/db/entities/users";
import { usersRepository } from "src/db/repositories/usersRepository";

class UsersService implements IUsersService {
  constructor(readonly photographersRepository: IUsersRepository<SelectUser>) {}
  getAllAvailableNumbers = async (): Promise<string[]> => {
    const allUsers = await this.photographersRepository.getAllUsers();
    return allUsers.map((user) => {
      return user.phoneNumber;
    });
  };
}
export const usersService = new UsersService(usersRepository);
