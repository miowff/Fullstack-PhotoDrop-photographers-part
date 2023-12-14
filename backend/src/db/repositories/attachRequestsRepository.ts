import { MySql2Database } from "drizzle-orm/mysql2";
import { IAttachRequestsRepository } from "../IRepositories/IAttachRequestsRepository";
import { db } from "../dbConnection";
import {
  InsertRequest,
  SelectRequest,
  attachRequest,
} from "../entities/attachPhotoRequest";
import { eq } from "drizzle-orm";

class AttachPhotosRequestsRepository
  implements IAttachRequestsRepository<InsertRequest, SelectRequest>
{
  constructor(private readonly db: MySql2Database) {}
  delete = async (photoKey: string): Promise<void> => {
    await this.db
      .delete(attachRequest)
      .where(eq(attachRequest.photoKey, photoKey));
  };
  add = async (request: InsertRequest): Promise<void> => {
    await this.db.insert(attachRequest).values(request);
  };
  get = async (photoKey: string): Promise<SelectRequest> => {
    const result = await this.db
      .select()
      .from(attachRequest)
      .where(eq(attachRequest.photoKey, photoKey));
    return result[0];
  };
}
export const attachPhotosRequestsRepository =
  new AttachPhotosRequestsRepository(db);
