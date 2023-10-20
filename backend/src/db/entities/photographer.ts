import { photographers as schemaPhotographers } from "../photodrop-database-schema/schema/photographer";
export const photographers = schemaPhotographers;
export type Photographer = typeof photographers.$inferSelect;
