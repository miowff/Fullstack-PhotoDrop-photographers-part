import { users as schemaUsers } from "../photodrop-database-schema/schema/user";
export const users = schemaUsers;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export interface User {
  personId: string;
  email: string | null;
  fullName: string | null;
  profilePhotoKey: string | null;
  phoneNumber: string;
}
