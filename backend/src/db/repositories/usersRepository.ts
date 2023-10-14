import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { SelectUser, users } from "../schema/users";
import { db } from "../dbConnection";
import { eq } from "drizzle-orm";

class UsersRepository implements IUsersRepository<SelectUser> {
  constructor(private readonly db: MySql2Database) {}
  getUserByPhoneNumber = async (phoneNumber: string): Promise<SelectUser> => {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber));
    return user[0];
  };
  getAllUsers = async (): Promise<SelectUser[]> => {
    const numbers = await this.db.select().from(users);
    return numbers;
  };
}
export const usersRepository = new UsersRepository(db);
