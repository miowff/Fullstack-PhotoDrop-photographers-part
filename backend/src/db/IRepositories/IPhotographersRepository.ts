export interface IPhotographersRepository<T> {
  getByLogin(login: string): Promise<T>;
  getById(id: string): Promise<T>;
}
