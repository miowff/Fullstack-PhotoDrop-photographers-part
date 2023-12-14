export interface IAttachRequestsRepository<TInsert, TSelect> {
  delete(photoKey: string): Promise<void>;
  add(request: TInsert): Promise<void>;
  get(photoKey: string): Promise<TSelect>;
}
