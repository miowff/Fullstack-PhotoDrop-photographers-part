import { MySql2Database } from "drizzle-orm/mysql2";
import { IPhotographersRepository } from "../IRepositories/IPhotographersRepository";
import { Photographer, photographers } from "../schema/photographer";
import { eq } from "drizzle-orm";
import { db } from "../dbConnection";

class PhotographersRepository
  implements IPhotographersRepository<Photographer>
{
  constructor(private readonly db: MySql2Database) {}
  getByLogin = async (login: string): Promise<Photographer> => {
    const photographer = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.login, login));
    return photographer[0];
  };
  getById = async (id: string): Promise<Photographer> => {
    const photographer = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.id, id));
    return photographer[0];
  };
}
export const photographersRepository = new PhotographersRepository(db);
