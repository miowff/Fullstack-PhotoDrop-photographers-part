export interface IUsersRepository<TSelect> {
  getAllUsers(): Promise<TSelect[]>;
  getUserByPhoneNumber(number:string):Promise<TSelect>
}
