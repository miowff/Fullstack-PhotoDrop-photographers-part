import { attachPhotosRequests } from "../photodrop-database-schema/schema/attachPhotosRequests";

export const attachRequest = attachPhotosRequests;
export type InsertRequest = typeof attachRequest.$inferInsert;
export type SelectRequest = typeof attachRequest.$inferSelect;
