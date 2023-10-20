import { userPhotos as schemaUserPhotos } from "../photodrop-database-schema/schema/userPhotos";
export const userPhotos = schemaUserPhotos;
export type UserPhoto = typeof userPhotos.$inferInsert;
