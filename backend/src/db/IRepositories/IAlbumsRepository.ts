export interface IAlbumsRepository<TInsert, TSelect> {
  getAllPhotographerAlbums(id: string): Promise<TSelect[]>;
  addNew(album: TInsert): Promise<void>;
  getById(id: string): Promise<TSelect>;
  getByTitle(title: string): Promise<TSelect>;
}
